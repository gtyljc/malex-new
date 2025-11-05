
import {
    GET_LIST_QUERY,
    GET_ONE_QUERY,
    GET_MANY_QUERY,
    CREATE_QUERY,
    START_UPLOAD_IMAGE_QUERY,
    FINILAZE_UPLOAD_IMAGE_QUERY,
    UPDATE_QUERY,
    UPDATE_MANY_QUERY,
    DELETE_QUERY
} from "@src/api-requests";
import { nanoid } from "nanoid";
import { capitalize } from "@src/tools";

class DataProvider {
    // read about structure at https://marmelab.com/react-admin/useDataProvider.html

    constructor(gql_client, fields_schema) {
        this.gqlClient = gql_client;
        this.fieldsSchema = fields_schema;
    }

    // checks if in data has img field and then
    // saves image in Cloudflare Storage and returns 
    // new data in each case returns data
    async #imageInterception(data){
        if (data.img){
            const imgId = nanoid(15);

            // get upload link
            const startResponse = await this.gqlClient.mutate(
                {
                    mutation: START_UPLOAD_IMAGE_QUERY(),
                    variables: { img_id: imgId }
                }
            );
            
            // send on storage
            const body = new FormData();

            body.append("file", data.img.rawFile);

            await fetch(
                startResponse.data["startUploadImage"].data.url,
                { method: "POST", body }
            );

            // get info about uploaded image
            const finilazeResponse = await this.gqlClient.mutate(
                {
                    mutation: FINILAZE_UPLOAD_IMAGE_QUERY(),
                    variables: { img_id: imgId }
                }
            );

            // replace with new data
            delete data.img;

            data.img_id = imgId;
            data.img_urls = finilazeResponse.data["finalizeUploadImage"].data.urls;
        }

        console.log(data)

        return data;
    }

    // get a list of records based on sort, filter, and pagination
    async getList(resource, params) {
        const { 
            pagination, 
            sort, 
            filter = {} 
        } = params;
        const r = await this.gqlClient.query(
            {
                query: GET_LIST_QUERY(resource, this.fieldsSchema[resource]),
                variables: {
                    filter,
                    sort,
                    pagination
                }
            }
        );

        return r.data[`${resource}s`];
    }

    // get a single record by id
    async getOne(resource, params) {
        const { id } = params;
        const r = await this.gqlClient.query(
            {
                query: GET_ONE_QUERY(resource, this.fieldsSchema[resource]),
                variables: { id }
            }
        );

        return { data: r.data[resource] };
    }

    // get a list of records based on an array of ids
    async getMany(resource, params) {
        const { ids } = params;
        const r = await this.gqlClient.query(
            {
                query: GET_MANY_QUERY(resource, this.fieldsSchema[resource]),
                variables: { ids }
            }
        );

        return { data: r.data[`${resource}s`].items }
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
        const r = await this.gqlClient.query(
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

        return { data: r.data[`${resource}s`].items }
    }

    // create a record
    async create(resource, params) {
        let { data } = params;

        // check if img was inserted
        data = await this.#imageInterception(data);

        const r = await this.gqlClient.mutate(
            {
                mutation: CREATE_QUERY(resource, this.fieldsSchema[resource]),
                variables: { data }
            }
        )

        return { data: r.data[`create${capitalize(resource)}`].data };
    }

    // update a record based on a patch
    async update(resource, params) {
        const { id } = params;
        let { data } = params;

        console.log(data);

        // check if img was inserted
        data = this.#imageInterception(data);

        const r = await this.gqlClient.mutate(
            {
                mutation: UPDATE_QUERY(resource, this.fieldsSchema[resource]),
                variables: { id, data }
            }
        )

        return { data: r.data[`update${capitalize(resource)}`].data };
    }

    // update a list of records based on an array of ids and a common patch
    async updateMany(resource, params) {
        const { ids } = params;
        let { data } = params;

        // check if img was inserted
        data = this.#imageInterception(data);

        const r = await this.gqlClient.mutate(
            {
                mutation: UPDATE_MANY_QUERY(resource, this.fieldsSchema[resource]),
                variables: { ids, data }
            }
        )

        return {data: r.data[`updateMany${capitalize(resource)}s`].data};
    }

    // delete a record by id
    async delete(resource, params) {
        const { id } = params;

        const r = await this.gqlClient.mutate(
            {
                mutation: DELETE_QUERY(resource, this.fieldsSchema[resource]),
                variables: { id }
            }
        )

        return { data: r.data[`delete${capitalize(resource)}`].data }
    }

    // delete a list of records based on an array of ids
    async deleteMany(resource, params) {
        const { ids } = params;

        const r = await this.gqlClient.mutate(
            {
                mutation: DELETE_QUERY(resource, this.fieldsSchema[resource]),
                variables: { ids }
            }
        )

        return { data: r.data[`deleteMany${capitalize(resource)}s`].data };
    }
}

export default DataProvider;