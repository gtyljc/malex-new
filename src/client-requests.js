
// here is all possible GraphQL queries that can Client use

import { gql } from "@apollo/client";

export class AppointmentQueries {

    // returns all appointments that are in the range of date
    static BusyTimesAtDay(){
        return gql`
            query BusyTimesAtDay($date: DateTimeISO!){
                appointmentsInRange(from: $date) {
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

export class AdminConfigQueries {

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

export class ImageUploadQueiries {

    // get an image uploud link
    static startImageUpload() {
        return gql`
            mutation StartImageUpload($id: ID!){
                startImageUpload(id: $img_id) {
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
                finalizeImageUpload(id: $img_id) {
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

export class WorkQueries {
    
    // returns all works (must be used with pagination)
    static getWorks() {
        return gql`
            query GetWorks($filter: JSONObject, $pagination: PaginationInput){
                works(filter: $filter, pagination: $pagination) {
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