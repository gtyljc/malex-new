
import { 
    StartImageUploadDocument,
    FinalizeImageUploadDocument 
} from "@src/lib/apollo-clients/queries";
import { TypedDocumentNode } from "@apollo/client";
import { nanoid } from "nanoid";
import { capitalize } from "@lib/tools";
import { ApolloClient } from "@apollo/client";
import * as types from "@lib/types";
import {
    CreateParams,
    CreateResult,
    DeleteManyResult,
    DeleteManyParams,
    DeleteParams,
    DeleteResult,
    GetListParams,
    GetListResult,
    GetOneParams,
    GetOneResult,
    GetManyParams,
    GetManyResult,
    GetManyReferenceParams,
    GetManyReferenceResult,
    UpdateManyParams,
    UpdateManyResult,
    UpdateResult,
    UpdateParams
} from "react-admin";

interface DataProviderErrorParams {
    code?: number;
    message?: string;
}

export class DataProviderError extends Error {    
    code: number;
    
    constructor({ code, message }: DataProviderErrorParams = {}){
        super();

        this.code = code;
        this.message = message;
    }
}

class DataProvider {
    apolloClient: ApolloClient;
    resourceQueries: Record<types.ResourceEnum, TypedDocumentNode[]>;

    constructor(apolloClient: ApolloClient, resourceQueries: Record<types.ResourceEnum, TypedDocumentNode[]>) {
        this.apolloClient = apolloClient;
        this.resourceQueries = resourceQueries;
    }

    // checks if in data has img field and then
    // saves image in Cloudflare Storage and returns 
    // new data in each case returns data
    private async imageInterception(data: Record<string, any>){
        if (data.img_url){
            const imgId = nanoid(15);

            // get upload link
            const startResponse = await this.apolloClient.mutate(
                {
                    mutation: StartImageUploadDocument,
                    variables: { id: imgId }
                }
            );
            
            // send on storage
            const body = new FormData();

            body.append("file", data.img_url.rawFile);

            await fetch(
                startResponse.data.startImageUpload.data[0].url as string,
                { method: "POST", body }
            );

            // get info about uploaded image
            const finalizeResponse = await this.apolloClient.mutate(
                {
                    mutation: FinalizeImageUploadDocument,
                    variables: { id: imgId }
                }
            );

            // replace with new data
            delete data.img;

            data.img_id = imgId;
            data.img_url = finalizeResponse.data.finalizeImageUpload.data[0].url;
        }

        return data;
    }

    private catch(fieldName: string, response: ApolloClient.MutateResult | ApolloClient.QueryResult){
        if (response.error){
            throw new DataProviderError({ code: 400, message: response.error.message });
        }

        if (response.data && !response.data[fieldName].success){
            throw new DataProviderError(
                { 
                    code: response.data[fieldName].code, 
                    message: response.data[fieldName].message 
                }
            );
        }

        return response.data[fieldName];
    }

    // get a list of records based on sort, filter, and pagination
    async getList(resource: types.ResourceEnum, params: GetListParams): Promise<GetListResult> {
        const query = this.resourceQueries[resource][`GetList${ capitalize(resource) }sDocument`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });
        
        const responseData = this.catch(
            `${resource}s`,
            await this.apolloClient.query(
                {
                    query,
                    variables: {
                        filter: params.filter,
                        sort: params.sort,
                        pagination: params.pagination
                    }
                }
            )
        );

        return {
            data: responseData.data,
            total: responseData.pagination.total,
            pageInfo: responseData.pagination.pageInfo
        };
    }

    // get a single record by id
    async getOne(resource: types.ResourceEnum, params: GetOneParams): Promise<GetOneResult> {
        const query = this.resourceQueries[resource][`Get${ capitalize(resource) }`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });

        const responseData = this.catch(
            resource,
            await this.apolloClient.query(
                {
                    query,
                    variables: { id: params.id }
                }
            )
        )

        return { data: responseData.data[0] };
    }

    // get a list of records based on an array of ids
    async getMany(resource: types.ResourceEnum, params: GetManyParams): Promise<GetManyResult> {
        const query = this.resourceQueries[resource][`GetMany${ capitalize(resource) }s`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });

        const responseData = this.catch(
            `${resource}s`,
            await this.apolloClient.query(
                {
                    query,
                    variables: { ids: params.ids }
                }
            )
        );

        return { data: responseData.data }
    }

    // get the records referenced to another record, e.g. comments for a post
    async getManyReference(resource: types.ResourceEnum, params: GetManyReferenceParams): Promise<GetManyReferenceResult> {
        const query = this.resourceQueries[resource][`GetList${ capitalize(resource) }sDocument`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });
        
        const responseData = this.catch(
            `${resource}s`,
            await this.apolloClient.query(
                {
                    query,
                    variables: { 
                        filter: {
                            
                            // condition to find references
                            where: { [params.target]: { is: { id: params.id } } },

                            // RA specified filter
                            ...params.filter
                        },
                        sort: params.sort,
                        pagination: params.pagination
                    }
                }
            )
        );

        return { data: responseData.data }
    }

    // create a record
    async create(resource: types.ResourceEnum, params: CreateParams): Promise<CreateResult> {
        const query = this.resourceQueries[resource][`Create${ capitalize(resource) }`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });
        
        let { data } = params;

        // check if img was inserted
        data = await this.imageInterception(data);
        
        const responseData = this.catch(
            `create${capitalize(resource)}`,
            await this.apolloClient.mutate(
                {
                    mutation: query,
                    variables: { data }
                }
            )
        )

        return { data: responseData.data[0] };
    }

    // update a record based on a patch
    async update(resource: types.ResourceEnum, params: UpdateParams): Promise<UpdateResult> {
        const query = this.resourceQueries[resource][`Update${ capitalize(resource) }`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });

        let { data } = params;

        delete data.id;

        // check if img was inserted
        data = await this.imageInterception(data);

        const responseData = this.catch(
            `update${capitalize(resource)}`,
            await this.apolloClient.mutate(
                {
                    mutation: query,
                    variables: { id: params.id, data }
                }
            )
        )

        return { data: responseData.data[0] };
    }

    // update a list of records based on an array of ids and a common patch
    async updateMany(resource: types.ResourceEnum, params: UpdateManyParams): Promise<UpdateManyResult> {
        const query = this.resourceQueries[resource][`UpdateMany${ capitalize(resource) }s`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });
        
        let { data } = params;

        delete data.id;

        // check if img was inserted
        data = await this.imageInterception(data);

        const responseData = this.catch(
            `updateMany${capitalize(resource)}s`,
            await this.apolloClient.mutate(
                {
                    mutation: query,
                    variables: { ids: params.ids, data }
                }
            )
        )

        return { data: responseData.data };
    }

    // delete a record by id
    async delete(resource: types.ResourceEnum, params: DeleteParams): Promise<DeleteResult> {
        const query = this.resourceQueries[resource][`Delete${ capitalize(resource) }`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });

        const responseData = this.catch(
            `delete${capitalize(resource)}`,
            await this.apolloClient.mutate(
                {
                    mutation: query,
                    variables: { id: params.id }
                }
            )
        )

        return { data: responseData.data[0] }
    }

    // delete a list of records based on an array of ids
    async deleteMany(resource: types.ResourceEnum, params: DeleteManyParams): Promise<DeleteManyResult> {
        const query = this.resourceQueries[resource][`DeleteMany${ capitalize(resource) }`];

        if (!query) throw new DataProviderError({ code: 500, message: "The method is not supported!" });
        
        const responseData = this.catch(
            `deleteMany${capitalize(resource)}s`,
            (
                await this.apolloClient.mutate(
                    {
                        mutation: query,
                        variables: { ids: params.ids }
                    }
                )
            )
        )

        return { data: responseData.data };
    }
}

export default DataProvider;