
import { gql } from "@apollo/client";

class DataProvider {
    constructor(gql_client, responses) {
        this.gql_client = gql_client;
        this.responses = responses;
    }

    // get a list of records based on sort, filter, and pagination
    async getList(resource, params) {
        const GET_LIST =  gql`
            query GetList($filter: JSON, $pagination: Pagination, $sort: Sort) {
                ${resource}s (filter: $filter, pagination: $pagination){
                    ${resource}s {
                        ${this.responses[resource].read.join(", ")}
                    }
                }
            }
        `;
        const r = await this.gql_client.query(
            {
                query: GET_LIST,
                variables: {
                    ...(params.filters ? { filter: JSON.stringify(...params.filter) }: {}),
                    ...(params.sort ? { sort: params.sort }: {}),
                    ...(params.pagination ? { pagination: params.pagination }: {})
                }
            }
        );

        return r.data;
    }

    // get a single record by id
    async getOne(resource, params) {
        const GET_ONE = gql`
            query GetOne($id: ID!) {
                ${resource} (id: $id){
                    ${this.resources[resource].read.join(", ")}
                }
            }
        `;
        const r = await this.gql_client.query(
            {
                query: GET_ONE,
                variables: {
                    ...(params.filters ? { filter: JSON.stringify(...params.filter) }: {})
                }
            }
        );

        return r.data;
    }

    // get a list of records based on an array of ids
    async getMany(resource, params) {
        const GET_MANY = gql`
            query GetMany($ids: [ID]!) {
                ${resource}s (ids: $ids){
                    ${this.responses[resource].read.join(", ")}
                }
            }
        `;


    }

    // get the records referenced to another record, e.g. comments for a post
    async getManyReference(resource, params) {
        
    }

    // create a record
    async create(resource, params) {

        
    }

    // update a record based on a patch
    async update(resource, params) {

        
    }

    // update a list of records based on an array of ids and a common patch
    async updateMany(resource, params) {
        
    }

    // delete a record by id
    async delete(resource, params) {
        
    }

    // delete a list of records based on an array of ids
    async deleteMany(resource, params) {
        
    }
}

export default DataProvider;