
// here is all possible GraphQL queries

import { gql } from "@apollo/client";
import { capitalize } from "@src/tools";

// get an image uploud link
export const START_UPLOAD_IMAGE_QUERY = () => {
    return gql`
        mutation StartUploadImage($img_id: ID!){
            startUploadImage(img_id: $img_id) {
                code
                success
                message
                data {
                    id,
                    url
                }
            }
        }
    `
}

// return a details about uploaded image
export const FINILAZE_UPLOAD_IMAGE_QUERY = () => {
    return gql`
        mutation FinalizeUploadImage($img_id: ID!){
            finalizeUploadImage(img_id: $img_id) {
                code
                success
                message
                data {
                    id,
                    urls
                }
            }
        }
    `
}

// get a list of records based on sort, filter, and pagination
export const GET_LIST_QUERY = (resource, fields) => {
    return gql`
        query GetList($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput!) {
            ${resource}s (filter: $filter, pagination: $pagination, sort: $sort) {
                ... on ${capitalize(resource)}ItemsPaginatedType {
                    data {
                        ${fields.join(", ")}
                    }
                    pageInfo {
                        hasNextPage
                        hasPreviousPage
                    }
                    total
                }
            }
        }
    `;
}

// get a single record by id
export const GET_ONE_QUERY = (resource, fields) => {
    return gql`
        query GetOne($id: ID!) {
            ${resource} (id: $id){
                ${fields.join(", ")}
            }
        }
    `;
}

// get a list of records based on an array of ids
export const GET_MANY_QUERY = (resource, fields) => {
    return gql`
        query GetMany($ids: [ID]!) {
            ${resource}s (ids: $ids) {
                ... on ${capitalize(resource)}ItemsType {
                    items {
                        ${fields.join(", ")}
                    }
                }
            }
        }
    `;
}

// create a record
export const CREATE_QUERY = (resource, fields) => {
    const capitalizedResorceName = capitalize(resource);

    return gql`
        mutation Create($data: ${capitalizedResorceName}CreateInput){
            create${capitalizedResorceName}(data: $data) {
                code
                success
                message
                data {
                    ${fields.join(", ")}
                }
            }
        }
    `
}

// update a record based on a patch
export const UPDATE_QUERY = (resource, fields) => {
    const capitalizedResorceName = capitalize(resource);

    return gql`
        mutation Update($id: ID!, $data: ${capitalizedResorceName}UpdateInput!){
            update${capitalizedResorceName}(id: $id, data: $data) {
                code
                success
                message
                data {
                    ${fields.join(", ")}
                }
            }
        }
    `
}

// update a list of records based on an array of ids and a common patch
export const UPDATE_MANY_QUERY = (resource, fields) => {
    const capitalizedResorceName = capitalize(resource);

    return gql`
        mutation UpdateMany($ids: [ID]!, $data: ${capitalizedResorceName}UpdateInput!){
            updateMany${capitalizedResorceName}s(ids: $ids, data: $data) {
                code
                success
                message
                data {
                    ${fields.join(", ")}
                }
            }
        }
    `
}

// delete a record by id
export const DELETE_QUERY = (resource, fields) => {
    return gql`
        mutation Delete($id: ID!){
            delete${capitalize(resource)}(id: $id) {
                code
                success
                message
                data {
                    ${fields.join(", ")}
                }
            }
        }
    `
}

// delete a list of records based on an array of ids
export const DELETE_MANY_QUERY = (resource, fields) => {
    return gql`
        mutation Delete($id: ID!){
            deleteMany${capitalize(resource)}s(id: $id) {
                code
                success
                message
                data {
                    ${fields.join(", ")}
                }
            }
        }
    `
}