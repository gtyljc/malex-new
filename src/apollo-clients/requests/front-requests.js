
// here is all possible GraphQL queries that can be only at backend executed

import { gql } from "@apollo/client";

export class AppointmentQueries {

    // returns all appointments that are in the range of date
    static busyTimesAtDay(){
        return gql`
            query BusyTimesAtDay($date: DateTimeISO!){
                busyTimesAtDay(date: $date) {
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

    // returns boolean, which means is there free place for new appointments
    static isDayBusy(){
        return gql`
            query IsDayBusy($date: DateTimeISO){
                isDayBusy(date: $date) {
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

    static busyDaysAtMonth(){
        return gql`
            query BusyDaysAtMonth($date: DateTimeISO){
                busyDaysAtMonth(date: $date) {
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
            query GetWorks($filter: JSONObject, $pagination: PaginationInput){
                getWorks(filter: $filter, pagination: $pagination) {
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
        console.log(";le;lfe;l1");

         return gql`
            mutation AdminLogin($username: String!, $password: String!){
                adminLogin(username: $username, password: $password) {
                    code
                    success
                    message
                    data {
                        token,
                        r_token
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
                        token,
                        r_token
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
                        token,
                        r_token
                    }
                }
            }
        `
    }
}