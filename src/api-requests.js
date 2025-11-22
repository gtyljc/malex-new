
// here is all possible GraphQL queries

import { gql } from "@apollo/client";
import { capitalize } from "@src/tools";

// get an image uploud link
export const START_IMAGE_UPLOAD_QUERY = () => {
    return gql`
        mutation StartImageUpload($img_id: ID!){
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
export const FINALIZE_IMAGE_UPLOAD_QUERY = () => {
    return gql`
        mutation FinalizeImageUpload($img_id: ID!){
            finalizeUploadImage(img_id: $img_id) {
                code
                success
                message
                data {
                    id
                    url
                }
            }
        }
    `
}

// get a list of records based on sort, filter, and pagination
export const GET_LIST_QUERY = (resource, fields) => {    
    return gql`
        query GetList($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput) {
            ${resource}s (filter: $filter, pagination: $pagination, sort: $sort) {
                code
                success
                message
                data {
                    ${ fields.join(", ") }
                }
                pagination {
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
                code
                success
                message
                data {
                    ${fields.join(", ")}
                }
            }
        }
    `;
}

// get a list of records based on an array of ids
export const GET_MANY_QUERY = (resource, fields) => {
    return gql`
        query GetMany($ids: [ID]!) {
            ${resource}s (ids: $ids) {
                code
                success
                message
                data {
                    ${ fields.join(", ") }
                }
            }
        }
    `;
}

// create a record
export const CREATE_QUERY = (resource, fields = []) => {
    const capitalizedResorceName = capitalize(resource);

    return gql`
        mutation Create($data: ${capitalizedResorceName}CreateInput!){
            create${capitalizedResorceName}(data: $data) {
                code
                success
                message
                ${
                    fields.length != 0 ? `data {
                        ${ fields.join(", ") }
                    }`: ""
                }
            }
        }
    `
}

// update a record based on a patch
export const UPDATE_QUERY = (resource, fields = []) => {
    const capitalizedResorceName = capitalize(resource);

    return gql`
        mutation Update($id: ID!, $data: ${capitalizedResorceName}UpdateInput!){
            update${capitalizedResorceName}(id: $id, data: $data) {
                code
                success
                message
                ${
                    fields.length != 0 ? `data {
                        ${ fields.join(", ") }
                    }`: ""
                }
            }
        }
    `
}

// update a list of records based on an array of ids and a common patch
export const UPDATE_MANY_QUERY = (resource, fields = []) => {
    const capitalizedResorceName = capitalize(resource);

    return gql`
        mutation UpdateMany($ids: [ID]!, $data: ${capitalizedResorceName}UpdateInput!){
            updateMany${capitalizedResorceName}s(ids: $ids, data: $data) {
                code
                success
                message
                ${
                    fields.length != 0 ? `data {
                        ${ fields.join(", ") }
                    }`: ""
                }
            }
        }
    `
}

// delete a record by id
export const DELETE_QUERY = (resource, fields = []) => {
    return gql`
        mutation Delete($id: ID!){
            delete${capitalize(resource)}(id: $id) {
                code
                success
                message
                ${
                    fields.length != 0 ? `data {
                        ${ fields.join(", ") }
                    }`: ""
                }
            }
        }
    `
}

// delete a list of records based on an array of ids
export const DELETE_MANY_QUERY = (resource, fields = []) => {
    return gql`
        mutation Delete($id: ID!){
            deleteMany${capitalize(resource)}s(id: $id) {
                code
                success
                message
                ${
                    fields.length != 0 ? `data {
                        ${ fields.join(", ") }
                    }`: ""
                }
            }
        }
    `
}

// returns all appointments that are in the range of date
export const GET_APPOINTMENTS_IN_RANGE_QUERY = (fields = []) => {
    return gql`
        mutation GetAppointmentsInRange($from: DateTimeISO!, $to: DateTimeISO!){
            getAppointmentsInRange(from: $from, to: $to) {
                code
                success
                message
                ${
                    fields.length != 0 ? `data {
                        ${ fields.join(", ") }
                    }`: ""
                }
            }
        }
    `
}