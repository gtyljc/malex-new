

// here is all possible GraphQL queries that can be executed at frontend and also at backend

import { gql } from "@apollo/client";
import { capitalize } from "@src/tools";

export class AdminQueries {
    // all children must contain to fields: resource -> name of resource to manipulate
    // and fields -> all available fields at resource

    // get a list of records based on sort, filter, and pagination
    static getList() {
        return gql`
            query GetList($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput) {
                ${this.resource}s (filter: $filter, pagination: $pagination, sort: $sort) {
                    code
                    success
                    message
                    data {
                        ${ this.fields.join(", ") }
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
    static getOne(){
        return gql`
            query GetOne($id: ID!) {
                ${this.resource} (id: $id){
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
                ${this.resource}s (ids: $ids) {
                    code
                    success
                    message
                    data {
                        ${ this.fields.join(", ") }
                    }
                }
            }
        `;
    }

    // create a record
    static create(){
        const capitalizedResorceName = capitalize(this.resource);

        return gql`
            mutation Create($data: ${capitalizedResorceName}CreateInput!){
                create${capitalizedResorceName}(data: $data) {
                    code
                    success
                    message
                    ${
                        this.fields.length != 0 ? `data {
                            ${ this.fields.join(", ") }
                        }`: ""
                    }
                }
            }
        `
    }

    // update a record based on a patch
    static update(){
        const capitalizedResorceName = capitalize(this.resource);

        return gql`
            mutation Update($id: ID!, $data: ${capitalizedResorceName}UpdateInput!){
                update${capitalizedResorceName}(id: $id, data: $data) {
                    code
                    success
                    message
                    ${
                        this.fields.length != 0 ? `data {
                            ${ this.fields.join(", ") }
                        }`: ""
                    }
                }
            }
        `
    }

    // update a list of records based on an array of ids and a common patch
    static updateMany(){
        const capitalizedResorceName = capitalize(this.resource);

        return gql`
            mutation UpdateMany($ids: [ID]!, $data: ${capitalizedResorceName}UpdateInput!){
                updateMany${capitalizedResorceName}s(ids: $ids, data: $data) {
                    code
                    success
                    message
                    ${
                        this.fields.length != 0 ? `data {
                            ${ this.fields.join(", ") }
                        }`: ""
                    }
                }
            }
        `
    }

    // delete a record by id
    static delete(){
        return gql`
            mutation Delete($id: ID!){
                delete${capitalize(this.resource)}(id: $id) {
                    code
                    success
                    message
                    ${
                        this.fields.length != 0 ? `data {
                            ${ this.fields.join(", ") }
                        }`: ""
                    }
                }
            }
        `
    }

    // delete a list of records based on an array of ids
    static deleteMany(){
        return gql`
            mutation Delete($id: ID!){
                deleteMany${capitalize(this.resource)}s(id: $id) {
                    code
                    success
                    message
                    ${
                        this.fields.length != 0 ? `data {
                            ${ this.fields.join(", ") }
                        }`: ""
                    }
                }
            }
        `
    }
}

export class AppointmentQueries extends AdminQueries {
    static resource = "appointment";
    static fields = [
        "id",
        "name",
        "surname",
        "address",
        "job_desc",
        "bwt",
        "number",
        "date",
        "duration",
        "completed"
    ]
}


export class WorkQueries extends AdminQueries {
    static resource = "work";
    static fields = [
        "id",
        "img_url",
        "img_id",
        "category",
        "timestamp"
    ]
}

export class SiteConfigQueries extends AdminQueries {
    static resource = "siteConfig";
    static fields = [
        "id",
        "opening_at",
        "closing_at",
        "min_duration",
        "support_email",
        "phone_number"
    ]
}

export class AuthQueries {
    static createJWT(){
        return gql`
            mutation CreateJWT($role: RoleEnum!){
                createJWT(role: $role) {
                    code
                    success
                    message
                    data {
                        token
                    }
                }
            }
        `
    }
}

export class ImageUploadQueries {

    // get an image uploud link
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
