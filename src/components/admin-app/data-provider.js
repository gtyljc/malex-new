
// request config
const apiUrl = process.env.ADMIN_API_URL;

async function sendPost(body, resource) {
    const response = await fetch(
        apiUrl + `/${resource}`,
        PostConfig(JSON.stringify(body))
    );
    
    return JSON.parse(response.body);
};

const dataProvider = {

    // get a list of records based on sort, filter, and pagination
    getList: async (resource, params) => {
        
        // request
        const orderBy = params.sort ? {
            orderBy: {
                [params.sort.field]: params.sort.order
            }
        }: {};
        const pagination = params.pagination ? {
            skip: params.pagination.page,
            take: params.pagination.perPage
        }: {};
        const filter = params.filter ? {
            where: {
                ...params.filter
            }
        }: {};
        const body = {
            method: "getList",
            query: orderBy || pagination || filter
        }

        return await sendPost(body, resource);
    },

    // get a single record by id
    getOne:     (resource, params) => Promise, 
    // get a list of records based on an array of ids
    getMany:    (resource, params) => Promise, 
    // get the records referenced to another record, e.g. comments for a post
    getManyReference: (resource, params) => Promise, 
    // create a record
    create:     (resource, params) => Promise, 
    // update a record based on a patch
    update:     (resource, params) => Promise, 
    // update a list of records based on an array of ids and a common patch
    updateMany: (resource, params) => Promise, 
    // delete a record by id
    delete:     (resource, params) => Promise, 
    // delete a list of records based on an array of ids
    deleteMany: (resource, params) => Promise, 
}