

import { gql } from "@apollo/client";
import { capitalize } from "@lib/tools";
export * as webQueries from "./web";

export class ResourceQueries {
    static resourceName: string;
    fields: string[];
    resourceName: string;

    constructor(resourceName: string, fields: string[]){
        this.fields = fields;
        this.resourceName = resourceName;
    }

    // get a list of records based on sort, filter, and pagination
    getList() {
        return gql`
            query GetList($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput) {
                ${this.resourceName}s (filter: $filter, pagination: $pagination, sort: $sort) {
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
    getOne(){
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
    getMany(){
        return gql`
            query GetMany($ids: [ID]!) {
                ${this.resourceName}s (ids: $ids) {
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
    create(){
        const capitalizedResorceName = capitalize(this.resourceName);

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
    update(){
        const capitalizedResorceName = capitalize(this.resourceName);

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
    updateMany(){
        const capitalizedResorceName = capitalize(this.resourceName);

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
    delete(){
        return gql`
            mutation Delete($id: ID!){
                delete${capitalize(this.resourceName)}(id: $id) {
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
    deleteMany(){
        return gql`
            mutation DeleteMany($ids: [ID]!){
                deleteMany${capitalize(this.resourceName)}s(ids: $ids) {
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

export class AppointmentQueries extends ResourceQueries {
    static resourceName = "appointment";

    constructor(){
        super(
            AppointmentQueries.resourceName,
            [
                "id",
                "name",
                "surname",
                "address",
                "job_desc",
                "bwt",
                "phone_number",
                "date",
                "duration",
                "completed"
            ]
        )
    }
}

export class WorkQueries extends ResourceQueries {
    static resourceName = "work";

    constructor(){
        super(
            WorkQueries.resourceName,
            [
                "id",
                "img_url",
                "img_id",
                "category",
                "timestamp"
            ]       
        )
    }
}

export class SiteConfigQueries extends ResourceQueries {
    static resourceName = "siteConfig";

    constructor(){
        super(
            SiteConfigQueries.resourceName,
            [
                "id",
                "opening_at",
                "closing_at",
                "min_duration",
                "support_email",
                "phone_number",
                "timezone",
                "c_country"
            ]       
        )
    }
}

export class AuthQueries {
    
    // verifies data from Admin Panel Login Page
    static adminLogin(){
         return gql`
            mutation AdminLogin($username: String!, $password: String!){
                adminLogin(username: $username, password: $password) {
                    code
                    success
                    message
                    data
                }
            }
        `
    }

    // creates new AT using RT
    static adminLogout(){
        return gql`
            mutation adminLogout{
                adminLogout {
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
            query checkAdmin{
                checkAdmin {
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