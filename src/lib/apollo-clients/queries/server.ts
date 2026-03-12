

// here is all possible GraphQL queries that can be executed at frontend and also at backend

import { gql } from "@apollo/client";
import { capitalize } from "@lib/tools";
import * as clientQueries from "./client";

// export class ResourceQueries {
//     static resourceName: string;
//     fields: string[];
//     resourceName: string;

//     constructor(resourceName: string, fields: string[]){
//         this.fields = fields;
//         this.resourceName = resourceName;
//     }

//     // get a list of records based on sort, filter, and pagination
//     getList() {
//         return gql`
//             query GetList($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput) {
//                 ${this.resourceName}s (filter: $filter, pagination: $pagination, sort: $sort) {
//                     code
//                     success
//                     message
//                     data {
//                         ${ this.fields.join(", ") }
//                     }
//                     pagination {
//                         pageInfo {
//                             hasNextPage
//                             hasPreviousPage
//                         }
//                         total
//                     }
//                 }
//             }
//         `;
//     }

//     // get a single record by id
//     getOne(){
//         return gql`
//             query GetOne($id: ID!) {
//                 ${this.resourceName} (id: $id){
//                     code
//                     success
//                     message
//                     data {
//                         ${this.fields.join(", ")}
//                     }
//                 }
//             }
//         `;
//     }

//     // get a list of records based on an array of ids
//     getMany(){
//         return gql`
//             query GetMany($ids: [ID]!) {
//                 ${this.resourceName}s (ids: $ids) {
//                     code
//                     success
//                     message
//                     data {
//                         ${ this.fields.join(", ") }
//                     }
//                 }
//             }
//         `;
//     }

//     // create a record
//     create(){
//         const capitalizedResorceName = capitalize(this.resourceName);

//         return gql`
//             mutation Create($data: ${capitalizedResorceName}CreateInput!){
//                 create${capitalizedResorceName}(data: $data) {
//                     code
//                     success
//                     message
//                     ${
//                         this.fields.length != 0 ? `data {
//                             ${ this.fields.join(", ") }
//                         }`: ""
//                     }
//                 }
//             }
//         `
//     }

//     // update a record based on a patch
//     update(){
//         const capitalizedResorceName = capitalize(this.resourceName);

//         return gql`
//             mutation Update($id: ID!, $data: ${capitalizedResorceName}UpdateInput!){
//                 update${capitalizedResorceName}(id: $id, data: $data) {
//                     code
//                     success
//                     message
//                     ${
//                         this.fields.length != 0 ? `data {
//                             ${ this.fields.join(", ") }
//                         }`: ""
//                     }
//                 }
//             }
//         `
//     }

//     // update a list of records based on an array of ids and a common patch
//     updateMany(){
//         const capitalizedResorceName = capitalize(this.resourceName);

//         return gql`
//             mutation UpdateMany($ids: [ID]!, $data: ${capitalizedResorceName}UpdateInput!){
//                 updateMany${capitalizedResorceName}s(ids: $ids, data: $data) {
//                     code
//                     success
//                     message
//                     ${
//                         this.fields.length != 0 ? `data {
//                             ${ this.fields.join(", ") }
//                         }`: ""
//                     }
//                 }
//             }
//         `
//     }

//     // delete a record by id
//     delete(){
//         return gql`
//             mutation Delete($id: ID!){
//                 delete${capitalize(this.resourceName)}(id: $id) {
//                     code
//                     success
//                     message
//                     ${
//                         this.fields.length != 0 ? `data {
//                             ${ this.fields.join(", ") }
//                         }`: ""
//                     }
//                 }
//             }
//         `
//     }

//     // delete a list of records based on an array of ids
//     deleteMany(){
//         return gql`
//             mutation DeleteMany($ids: [ID]!){
//                 deleteMany${capitalize(this.resourceName)}s(ids: $ids) {
//                     code
//                     success
//                     message
//                     ${
//                         this.fields.length != 0 ? `data {
//                             ${ this.fields.join(", ") }
//                         }`: ""
//                     }
//                 }
//             }
//         `
//     }
// }

// export class AppointmentQueries extends ResourceQueries {
//     static resourceName = "appointment";

//     constructor(){
//         super(
//             AppointmentQueries.resourceName,
//             [
//                 "id",
//                 "name",
//                 "surname",
//                 "address",
//                 "job_desc",
//                 "bwt",
//                 "phone_number",
//                 "date",
//                 "duration",
//                 "completed"
//             ]
//         )
//     }
// }

// export class WorkQueries extends ResourceQueries {
//     static resourceName = "work";

//     constructor(){
//         super(
//             WorkQueries.resourceName,
//             [
//                 "id",
//                 "img_url",
//                 "img_id",
//                 "category",
//                 "timestamp"
//             ]       
//         )
//     }
// }

// export class SiteConfigQueries extends ResourceQueries {
//     static resourceName = "siteConfig";

//     constructor(){
//         super(
//             SiteConfigQueries.resourceName,
//             [
//                 "id",
//                 "opening_at",
//                 "closing_at",
//                 "min_duration",
//                 "support_email",
//                 "phone_number",
//                 "timezone",
//                 "c_country"
//             ]       
//         )
//     }
// }

export class ResourceQueries {
    static resourceName: string;

    // get a list of records based on sort, filter, and pagination
    static getList() {
        return gql`
            query GetList($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput) {
                ${this.resourceName}s (filter: $filter, pagination: $pagination, sort: $sort) {
                    code
                    success
                    message
                    data
                    pagination
                }
            }
        `;
    }

    // get a single record by id
    static getOne(){
        return gql`
            query GetOne($id: ID!) {
                ${this.resourceName} (id: $id){
                    code
                    success
                    message
                    data {
                        ${this.fields.join(", ")}
                    }
                }
            }
        `;
    }

    // get a list of records based on an array of ids
    static getMany(){
        return gql`
            query GetMany($ids: [ID]!) {
                ${this.resourceName}s (ids: $ids) {
                    code
                    success
                    message
                    data
                }
            }
        `;
    }

    // create a record
    static create(){
        const capitalizedResorceName = capitalize(this.resourceName);

        return gql`
            mutation Create($data: ${capitalizedResorceName}CreateInput!){
                create${capitalizedResorceName}(data: $data) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    // update a record based on a patch
    static update(){
        const capitalizedResorceName = capitalize(this.resourceName);

        return gql`
            mutation Update($id: ID!, $data: ${capitalizedResorceName}UpdateInput!){
                update${capitalizedResorceName}(id: $id, data: $data) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    // update a list of records based on an array of ids and a common patch
    static updateMany(){
        const capitalizedResorceName = capitalize(this.resourceName);

        return gql`
            mutation UpdateMany($ids: [ID]!, $data: ${capitalizedResorceName}UpdateInput!){
                updateMany${capitalizedResorceName}s(ids: $ids, data: $data) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    // delete a record by id
    static delete(){
        return gql`
            mutation Delete($id: ID!){
                delete${capitalize(this.resourceName)}(id: $id) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    // delete a list of records based on an array of ids
    static deleteMany(){
        return gql`
            mutation DeleteMany($ids: [ID]!){
                deleteMany${capitalize(this.resourceName)}s(ids: $ids) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }
}

export class AppointmentQueries extends ResourceQueries {
    static resourceName = "appointment";
}

export class WorkQueries extends ResourceQueries {
    static resourceName = "work";
}

export class SiteConfigQueries extends ResourceQueries {
    static resourceName = "siteConfig";
}

export class AuthQueries extends clientQueries.AuthQueries {
    static adminPanelKey(){
        return gql`
            query adminPanelKey {
                adminPanelKey {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    static createRT(){
        return gql`
            mutation createRT($user_id: ID, $role: RoleEnum!){
                createRT(user_id: $user_id, role: $role) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    static checkAdmin(){
        return gql`
            query checkAdmin(){
                createRT() {
                    code
                    success
                    message
                    data
                }
            }
        `
    }
}

export class ImageUploadQueries {

    // get an image upload link
    static startImageUpload() {
        return gql`
            mutation StartImageUpload($id: ID!){
                startImageUpload(id: $id) {
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
    
    // return a details about uploaded image
    static finalizeImageUpload() {
        return gql`
            mutation FinalizeImageUpload($id: ID!){
                finalizeImageUpload(id: $id) {
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
}
