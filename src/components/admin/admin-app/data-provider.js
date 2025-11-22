
import {
    GET_LIST_QUERY,
    GET_ONE_QUERY,
    GET_MANY_QUERY,
    CREATE_QUERY,
    START_IMAGE_UPLOAD_QUERY,
    FINALIZE_IMAGE_UPLOAD_QUERY,
    UPDATE_QUERY,
    UPDATE_MANY_QUERY,
    DELETE_QUERY
} from "@src/api-requests";
import { nanoid } from "nanoid";
import { capitalize } from "@src/tools";

class DataProvider {
    // read about structure at https://marmelab.com/react-admin/DataProviderWriting.html

    constructor(gql_client, fields_schema) {
        this.gqlClient = gql_client;
        this.fieldsSchema = fields_schema;
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
                    mutation: START_IMAGE_UPLOAD_QUERY(),
                    variables: { img_id: imgId }
                }
            );
            
            // send on storage
            const body = new FormData();

            body.append("file", data.img_url.rawFile);

            await fetch(
                startResponse.data["startUploadImage"].data.url,
                { method: "POST", body }
            );

            // get info about uploaded image
            const finilazeResponse = await this.gqlClient.mutate(
                {
                    mutation: FINALIZE_IMAGE_UPLOAD_QUERY(),
                    variables: { img_id: imgId }
                }
            );

            // replace with new data
            delete data.img;

            data.img_id = imgId;
            data.img_url = finilazeResponse.data["finalizeUploadImage"].data.url;
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
                    query: GET_LIST_QUERY(resource, this.fieldsSchema[resource]),
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
                    query: GET_ONE_QUERY(resource, this.fieldsSchema[resource]),
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
                    query: GET_MANY_QUERY(resource, this.fieldsSchema[resource]),
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
                    query: GET_LIST_QUERY(resource, this.fieldsSchema[resource]),
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
                    mutation: CREATE_QUERY(resource, this.fieldsSchema[resource]),
                    variables: { data }
                }
            )
        ).data[`create${capitalize(resource)}`]

        return { data: responseData.data };
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
                    mutation: UPDATE_QUERY(resource, this.fieldsSchema[resource]),
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
                    mutation: UPDATE_MANY_QUERY(resource, this.fieldsSchema[resource]),
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
                    mutation: DELETE_QUERY(resource, this.fieldsSchema[resource]),
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
                    mutation: DELETE_QUERY(resource, this.fieldsSchema[resource]),
                    variables: { ids }
                }
            )
        ).data[`deleteMany${capitalize(resource)}s`];

        return { data: responseData.data };
    }
}

export default DataProvider;