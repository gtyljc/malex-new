
import { ResourceQueries } from "@src/lib/apollo-clients/queries/server";
import { ImageUploadQueries } from "@src/lib/apollo-clients/queries/server";
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
    resourceQueries: Record<string, ResourceQueries>;

    constructor(apolloClient: ApolloClient, resourceQueries: Record<string, ResourceQueries>) {
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
                    mutation: ImageUploadQueries.startImageUpload(),
                    variables: { id: imgId }
                }
            );
            
            // send on storage
            const body = new FormData();

            body.append("file", data.img_url.rawFile);

            await fetch(
                startResponse.data.startImageUpload.data[0].url,
                { method: "POST", body }
            );

            // get info about uploaded image
            const finalizeResponse = await this.apolloClient.mutate(
                {
                    mutation: ImageUploadQueries.finalizeImageUpload(),
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

    private catch(fieldName: string, response: Record<string, any>){
        if (response.error){
            throw new DataProviderError();
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
    async getList(resource: types.Resource, params: GetListParams): Promise<GetListResult> {
        const responseData = this.catch(
            `${resource}s`,
            await this.apolloClient.query(
                {
                    query: this.resourceQueries[resource].getList(),
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
    async getOne(resource: types.Resource, params: GetOneParams): Promise<GetOneResult> {
        const responseData = this.catch(
            resource,
            await this.apolloClient.query(
                {
                    query: this.resourceQueries[resource].getOne(),
                    variables: { id: params.id }
                }
            )
        )

        return { data: responseData.data[0] };
    }

    // get a list of records based on an array of ids
    async getMany(resource: types.Resource, params: GetManyParams): Promise<GetManyResult> {
        const responseData = this.catch(
            `${resource}s`,
            await this.apolloClient.query(
                {
                    query: this.resourceQueries[resource].getMany(),
                    variables: { ids: params.ids }
                }
            )
        );

        return { data: responseData.data }
    }

    // get the records referenced to another record, e.g. comments for a post
    async getManyReference(resource: types.Resource, params: GetManyReferenceParams): Promise<GetManyReferenceResult> {
        const responseData = this.catch(
            `${resource}s`,
            await this.apolloClient.query(
                {
                    query: this.resourceQueries[resource].getList(),
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
    async create(resource: types.Resource, params: CreateParams): Promise<CreateResult> {
        let { data } = params;

        // check if img was inserted
        data = await this.imageInterception(data);
        
        const responseData = this.catch(
            `create${capitalize(resource)}`,
            await this.apolloClient.mutate(
                {
                    mutation: this.resourceQueries[resource].create(),
                    variables: { data }
                }
            )
        )

        return { data: responseData.data[0] };
    }

    // update a record based on a patch
    async update(resource: types.Resource, params: UpdateParams): Promise<UpdateResult> {
        let { data } = params;

        delete data.id;

        // check if img was inserted
        data = await this.imageInterception(data);

        const responseData = this.catch(
            `update${capitalize(resource)}`,
            await this.apolloClient.mutate(
                {
                    mutation: this.resourceQueries[resource].update(),
                    variables: { id: params.id, data }
                }
            )
        )

        return { data: responseData.data[0] };
    }

    // update a list of records based on an array of ids and a common patch
    async updateMany(resource: types.Resource, params: UpdateManyParams): Promise<UpdateManyResult> {
        let { data } = params;

        delete data.id;

        // check if img was inserted
        data = await this.imageInterception(data);

        const responseData = this.catch(
            `updateMany${capitalize(resource)}s`,
            await this.apolloClient.mutate(
                {
                    mutation: this.resourceQueries[resource].updateMany(),
                    variables: { ids: params.ids, data }
                }
            )
        )

        return { data: responseData.data };
    }

    // delete a record by id
    async delete(resource: types.Resource, params: DeleteParams): Promise<DeleteResult> {
        const responseData = this.catch(
            `delete${capitalize(resource)}`,
            await this.apolloClient.mutate(
                {
                    mutation: this.resourceQueries[resource].delete(),
                    variables: { id: params.id }
                }
            )
        )

        return { data: responseData.data[0] }
    }

    // delete a list of records based on an array of ids
    async deleteMany(resource: types.Resource, params: DeleteManyParams): Promise<DeleteManyResult> {
        const responseData = this.catch(
            `deleteMany${capitalize(resource)}s`,
            (
                await this.apolloClient.mutate(
                    {
                        mutation: this.resourceQueries[resource].deleteMany(),
                        variables: { ids: params.ids }
                    }
                )
            )
        )

        return { data: responseData.data };
    }
}

export default DataProvider;