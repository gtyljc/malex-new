
import { ImageUploadQueries } from "@src/apollo-clients/requests/backend";
import { nanoid } from "nanoid";
import { capitalize } from "@src/tools";

class DataProvider {
    // read about structure at https://marmelab.com/react-admin/DataProviderWriting.html

    constructor(gql_client, resource_queries) {
        this.gqlClient = gql_client;
        this.resourceQueries = resource_queries;
    }

    // checks if in data has img field and then
    // saves image in Cloudflare Storage and returns 
    // new data in each case returns data
    async #imageInterception(data){
        if (data.img_url){
            const imgId = nanoid(15);

            // get upload link
            const startResponse = await this.gqlClient.mutate(
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
            const finalizeResponse = await this.gqlClient.mutate(
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

    // get a list of records based on sort, filter, and pagination
    async getList(resource, params) {
        const { 
            pagination, 
            sort, 
            filter = {} 
        } = params;
        const responseData = (
            await this.gqlClient.query(
                {
                    query: this.resourceQueries[resource].getList(),
                    variables: {
                        filter,
                        sort,
                        pagination
                    }
                }
            )
        ).data[`${resource}s`];

        return {
            data: responseData.data,
            total: responseData.pagination.total,
            pageInfo: responseData.pagination.pageInfo
        };
    }

    // get a single record by id
    async getOne(resource, params) {
        const { id } = params;
        const responseData = (
            await this.gqlClient.query(
                {
                    query: this.resourceQueries[resource].getOne(),
                    variables: { id }
                }
            )
        ).data[resource];

        return { data: responseData.data[0] };
    }

    // get a list of records based on an array of ids
    async getMany(resource, params) {
        const { ids } = params;
        const responseData = (
            await this.gqlClient.query(
                {
                    query: this.resourceQueries[resource].getMany(),
                    variables: { ids }
                }
            )
        ).data[`${resource}s`];

        return { data: responseData.data }
    }

    // get the records referenced to another record, e.g. comments for a post
    async getManyReference(resource, params) {
        const { 
            target,
            id,
            pagination,
            sort,
            filter = {}
        } = params;
        const responseData = (
            await this.gqlClient.query(
                {
                    query: this.resourceQueries[resource].getList(),
                    variables: { 
                        filter: {
                            
                            // condition to find references
                            where: { [target]: { is: { id } } },

                            // RA specified filter
                            ...filter
                        },
                        sort,
                        pagination
                    }
                }
            )
        ).data[`${resource}s`];

        return { data: responseData.data }
    }

    // create a record
    async create(resource, params) {
        let { data } = params;

        // check if img was inserted
        data = await this.#imageInterception(data);
        
        const responseData = (
            await this.gqlClient.mutate(
                {
                    mutation: this.resourceQueries[resource].create(),
                    variables: { data }
                }
            )
        ).data[`create${capitalize(resource)}`]

        return { data: responseData.data[0] };
    }

    // update a record based on a patch
    async update(resource, params) {
        const { id } = params;
        let { data } = params;

        delete data.id;

        // check if img was inserted
        data = await this.#imageInterception(data);

        const responseData = (
            await this.gqlClient.mutate(
                {
                    mutation: this.resourceQueries[resource].update(),
                    variables: { id, data }
                }
            )
        ).data[`update${capitalize(resource)}`]

        return { data: responseData.data[0] };
    }

    // update a list of records based on an array of ids and a common patch
    async updateMany(resource, params) {
        const { ids } = params;
        let { data } = params;

        delete data.id;

        // check if img was inserted
        data = await this.#imageInterception(data);

        const responseData = (
            await this.gqlClient.mutate(
                {
                    mutation: this.resourceQueries[resource].updateMany(),
                    variables: { ids, data }
                }
            )
        ).data[`updateMany${capitalize(resource)}s`]

        return { data: responseData.data };
    }

    // delete a record by id
    async delete(resource, params) {
        const { id } = params;
        const responseData = (
            await this.gqlClient.mutate(
                {
                    mutation: this.resourceQueries[resource].delete(),
                    variables: { id }
                }
            )
        ).data[`delete${capitalize(resource)}`];

        return { data: responseData.data[0] }
    }

    // delete a list of records based on an array of ids
    async deleteMany(resource, params) {
        const { ids } = params;
        const responseData = (
            await this.gqlClient.mutate(
                {
                    mutation: this.resourceQueries[resource].deleteMany(),
                    variables: { ids }
                }
            )
        ).data[`deleteMany${capitalize(resource)}s`];

        return { data: responseData.data };
    }
}

export default DataProvider;