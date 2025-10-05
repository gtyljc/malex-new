
import { HttpError } from "react-admin";

class DataProvider {
    // all queries must be object that contains db request and follow the Prisma's rules

    constructor(apiUrl) {
        this.apiUrl = apiUrl;
    }

    async #sendPost(query, resource) {
        const response = await (
            await fetch(
                this.apiUrl + resource,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(query)
                }
            )
        ).json();

        // if API throws error
        if (response.status == 500){
            throw new HttpError(
                response.error_type + " : " + response.error,
                response.status,
                response
            );
        }

        return response;
    };

    #addPaginationToQuery(page, perPage){
        return (
            {
                skip: (page - 1) * perPage, // offset
                take: perPage,
            }
        )
    }

    #addSortToQuery(field, order){ // order can be ASC | DESC
        return (
            {
                orderBy: {
                    [field]: order.toLowerCase()
                }
            }
        )
    }

    #addFilterToQuery(filter){
        return (
            {
                where: {
                    ...filter
                }
            }
        )
    }

    #readImg(rawFile){
        return new Promise(
            (resolve, reject) => {
                const reader = new FileReader(rawFile)
            
                // setup
                reader.onload = () => resolve(reader.result);
                reader.onerror = () => reject();

                // run
                reader.readAsDataURL(rawFile);
            }
        )
    }

    // all queries must be object that contains db request and follow the Prisma's rules

    // get a list of records based on sort, filter, and pagination
    // params: {
    //     pagination: { page: number, perPage: number },
    //     sort: { field: string, order: 'ASC' | 'DESC' },
    //     filter: any
    // }

    async getList(resource, params) {
        const query = {
            method: "getList",
            query: {
                ...this.#addFilterToQuery(params.filter),
                ...this.#addSortToQuery(params.sort.field, params.sort.order),
                ...this.#addPaginationToQuery(params.pagination.page, params.pagination.perPage)
            }
        };

        return await this.#sendPost(query, resource);
    }

    // get a single record by id
    //
    // params: {
    //     id: Identifier
    // }

    async getOne(resource, params) {
        const id = parseInt(params.id);
        const query = {
            method: "getOne",
            query: {
                ...this.#addFilterToQuery({ id })
            }
        };

        return await this.#sendPost(query, resource);
    }

    // get a list of records based on an array of ids
    //
    // params: {
    //     ids: Identifier[]
    // }

    async getMany(resource, params) {
        const ids = params.ids.map(e => {parseInt(e)});
        const query = {
            method: "getMany",
            query: {
                ...this.#addFilterToQuery({ id: { in: ids } })
            }
        };

        return await this.#sendPost(query, resource);
    }

    // get the records referenced to another record, e.g. comments for a post
    //
    // params: {
    //     target: string;
    //     id: Identifier;
    //     pagination: { page: number, perPage: number };
    //     sort: { field: string, order: 'ASC' | 'DESC' };
    //     filter: any;
    // }

    async getManyReference(resource, params) {
        const id = parseInt(params.id);
        const query = {
            method: "getManyReference",
            query: {
                ...this.#addSortToQuery(params.sort.field, params.sort.order),
                ...this.#addFilterToQuery({
                    [params.target]: { equals: id },
                    ...params.filter
                }),
                ...this.#addPaginationToQuery(params.pagination.page, params.pagination.perPage)
            }
        };

        return await this.#sendPost(query, resource);
    }

    // create a record
    //
    // params: {
    //     data: Partial<Record>
    // }

    async create(resource, params) {

        // if we want to send an image on server
        if (process.env.NEXT_PUBLIC_IMAGE_KEYWORD in params.data){
            params.data.img = await this.#readImg(params.data.img.rawFile);
        }

        // convert id if neccessary
        if ("id" in params.data){
            params.id =  parseInt(params.id);
        }

        const query = {
            method: "create",
            query: {
                data: params.data
            }
        };

        return await this.#sendPost(query, resource);
    }

    // update a record based on a patch
    //
    // params: {
    //     id: Identifier,
    //     data: Partial<Record>
    // }

    async update(resource, params) {

        // if we want to send an image on server
        if (process.env.NEXT_PUBLIC_IMAGE_KEYWORD in params.data){
            params.data.img = await this.#readImg(params.data.img.rawFile);
        }

        const id = parseInt(params.id);
        const query = {
            method: "update",
            query: {
                data: params.data,
                ...addFilterToQuery({ id })
            }
        };

        return await this.#sendPost(query, resource);
    }

    // update a list of records based on an array of ids and a common patch
    //
    // params: {
    //      ids: Identifier[],
    //     data: Partial<Record>
    // }

    async updateMany(resource, params) {
        const ids = params.ids.map(e => {parseInt(e)});
        const query = {
            method: "updateMany",
            query: {
                data: params.data,
                ...this.#addFilterToQuery({ id: { in: ids } })
            }
        };

        return await this.#sendPost(query, resource);
    }

    // delete a record by id
    //
    // params: {
    //     id: Identifier
    // }

    async delete(resource, params) {
        const id = parseInt(params.id);
        const query = {
            method: "delete",
            query: {
                ...this.#addFilterToQuery({ id })
            }
        };

        return await this.#sendPost(query, resource);
    }

    // delete a list of records based on an array of ids
    //
    // params: {
    //     ids: Identifier[]
    // }

    async deleteMany(resource, params) {
        const ids = params.ids.map(e => {parseInt(e)});
        const query = {
            method: "deleteMany",
            query: {
                ...this.#addFilterToQuery({ id: { in: ids } })
            }
        };

        return await this.#sendPost(query, resource);
    }
}

export default DataProvider;