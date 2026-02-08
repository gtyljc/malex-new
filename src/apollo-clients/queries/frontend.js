
// here is all possible GraphQL queries that can be only at backend executed

import { gql } from "@apollo/client";

export class AppointmentQueries {

    // returns all "busy" objects that are in time range ( 
    // available two units "DAY" => is day busy; "APPOINTMENT" => 
    // returns "busy" objects, that corresponds made appointments in
    // time range )
    static busyInRange(){
        return gql`
            query busyInRange($start: DateTimeISO!, $end: DateTimeISO!, $unit: TimeUnitEnum!){
                busyInRange(start: $start, end: $end, unit: $unit) {
                    code
                    success
                    message
                    data {
                        date
                        busy
                    }
                }
            }
        `
    }
}

export class SiteConfigQueries {

    // returns object with contact data, that includes for instance
    // support email, contact phone number, closing and opening at infos, etc.
    static contactData(){
        return gql`
            query ContactData {
                contactData {
                    code
                    success
                    message
                    data {
                        opening_at
                        closing_at
                        support_email
                        phone_number
                        min_duration
                    }
                }
            }
        `
    }
}

export class WorkQueries {
    
    // returns all works (must be used with pagination)
    static getWorks() {
        return gql`
            query GetWorks($filter: JSONObject!, $pagination: PaginationInput!, $sort: SortInput){
                getWorks(filter: $filter, pagination: $pagination, sort: $sort) {
                    code
                    success
                    message
                    data {
                        img_url
                        category
                        timestamp
                    }
                }
            }
        `
    }

    // returns new works with specified num
    static newWorks() {
        return gql`
            query NewWorks($num: PositiveInt){
                newWorks(num: $num) {
                    code
                    success
                    message
                    data {
                        img_url
                        category
                        timestamp
                    }
                }
            }
        `
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
                    data {
                        at,
                        rt
                    }
                }
            }
        `
    }

    // creates new AT using RT
    static createAT(){
        return gql`
            mutation createAT {
                createAT {
                    code
                    success
                    message
                    data {
                        at,
                        rt
                    }
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
                    data {
                        at,
                        rt
                    }
                }
            }
        `
    }
}