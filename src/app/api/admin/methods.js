
import prisma from "@db/prisma-client";
import CloudflareImages from "@app/api/cloudflare-images";

// schema of possible methods that Admin API can accept
export class Methods {

    // modelName A.K.A resource
    constructor(modelName){
        this.modelName = modelName;
    }

    // error catcher for db requests
    async #makeDBRequest(DBMethod, query){
        try {
            return await prisma[this.modelName][DBMethod](query);
        }
        catch (err) {
            return {
                error_type: err.name,
                error: (err.message != null ? err.message: "No error message").replace(/[\n\r\t]/g, ""),
                status: 500
            }
        }
    }

    async #addPaginationToResponse(skip, take){
        const modelCount = await prisma[this.modelName].count();

        return (
            {
                total: modelCount,
                pageInfo: {
                    hasNextPage: modelCount - (skip + take) > 0,
                    hasPreviousPage: skip - take > 0
                }
            }
        )
    }

    async getList (query) {  
        const r = await this.#makeDBRequest("findMany", query);

        return "error" in r ? r: {
            data: r,
            status: 200,
            ...(
                "skip" in query && await this.#addPaginationToResponse(query.skip, query.take)
            )
        }
    }

    async getOne(query) {  
        const r = await this.#makeDBRequest("findFirst", query);

        return "error" in r ? r: {
            data: r,
            status: 200
        }
    }

    async getMany (query) {
        const r = await this.#makeDBRequest("findMany", query);

        return "error" in r ? r: {
            data: r,
            status: 200
        }
    }

    async getManyReference (query) {
        const r = await this.#makeDBRequest("findMany", query);

        return "error" in r ? r: {
            data: r,
            status: 200,
            ...(
                "skip" in query && await this.#addPaginationToResponse(query.skip, query.take)
            )
        }
    }

    async create (query) {
        const r = await this.#makeDBRequest("create", query);

        return "error" in r ? r: {
            data: r,
            status: 200
        }
    }

    async update (query) {
        const r = await this.#makeDBRequest("update", query);

        return "error" in r ? r: {
            data: r,
            status: 200
        }
    }

    async updateMany (query) {
        const r = await this.#makeDBRequest("updateMany", query);

        return "error" in r ? r: {
            data: query.where.id.in,
            status: 200
        }
    }

    async delete (query) {
        const r = await this.#makeDBRequest("delete", query);

        return "error" in r ? r: {
            data: r,
            status: 200
        }
    }

    async deleteMany (query) {
        const r = await this.#makeDBRequest("deleteMany", query);

        return "error" in r ? r: {
            data: query.where.id.in,
            status: 200
        }
    }
}

export class MethodsWithImageSupport extends Methods{
    
    // This class uses Cloudflare API as cloud for every recieved image
    // you can find documentation at https://developers.cloudflare.com/api/resources/images/
    //
    // The model that will be used by this class must contain at least
    // two fields: img_id, img_urls they respond fields at Cloudflare API ( id & variants )
    // You can change their names at the constructor

    constructor(...args){
        super(...args);

        this.imgAPI = new CloudflareImages();
        this.imgUrlsCol = "img_urls"; // name field in DB which contains urls on image
        this.imgIdCol = "img_id"; // name field in DB which contains image id
    }

    // converts base64 string to File instance
    #base64ToFile(base64, filename) {
        const arr = base64.split(",");
        const mime = arr[0].match(/:(.*?);/)[1];
        const bstr = atob(arr[1]);
        let n = bstr.length;
        const u8arr = new Uint8Array(n);
        while (n--) u8arr[n] = bstr.charCodeAt(n);
        return new File([u8arr], filename, { type: mime });
    }

    // handles image from request, saves it to Cloudflare, changes the body of DB query
    // and returns edited DB query
    async #saveImage(query) {
        const img = this.#base64ToFile(query.data[process.env.NEXT_PUBLIC_IMAGE_KEYWORD]);
        const response = await this.imgAPI.uploadImage(img); // save img at cloudflare

        // replaces "IMAGE_KEYWORD" field in query with model's field that contains urls
        query.data[this.imgUrlsCol] = response.data.variants;
        
        delete query.data[process.env.NEXT_PUBLIC_IMAGE_KEYWORD];
        
        // adds model's field that contains image id
        query.data[this.imgIdCol] = response.data.id;

        return query;
    }

    // takes DB response, edites DB response for dataProvider and returns changed
    #returnImage(response, many=false) {  // many => if method returns an array of objects
        if(many) {
            response.data.map(
                obj => {
                    obj[this.imgUrlsCol] = obj[this.imgUrlsCol].map( 
                        url => { return { url } } 
                    )
                }
            )
        }
        else {
            console.log(response);

            response.data[this.imgUrlsCol] = response.data[this.imgUrlsCol].map( 
                url => { return { url } } 
            )
        }

        return response;
    }

    // parsers img_id basing on record id and deletes it from cloudflare
    // and returns DB query back
    async #deleteImage(query, many=false){ // many => if method deletes a lot of records
        const findImageId = async (id) => { // id => id of record
            return await prisma[this.modelName].findFirst(
                {
                    select: { [this.imgIdCol]: true }, 
                    where: id
                }
            );
        }
        
        if(many){
            for (id in query.ids){
                await this.imgAPI.deleteImage(await findImageId(id)); // from cloudflare
            }
        }
        else {
            await findImageId(query.id);
        }

        return query;
    }

    async getList(query) {
        const r = await super.getList(query);

        return this.#returnImage(r, true);
    }

    async create(query) {
        const updatedQuery = await this.#saveImage(query);

        return await super.create(updatedQuery);
    }

    async update(query) {
        const updatedQuery = await this.#saveImage(await this.#deleteImage(query));

        return await super.update(updatedQuery);
    }

    async updateMany(query) {
        const updatedQuery = await this.#saveImage(await this.#deleteImage(query, true));

       return await super.updateMany(updatedQuery);
    }

    async delete(query) {
        const r = await super.delete(await this.#deleteImage(query));

        return this.#returnImage(r);
    }

    async deleteMany(query) {
        const r = await super.deleteMany(await this.#deleteImage(query, true));

        return this.#returnImage(r, true);
    }
}


// for POST handlers
export async function runMethod(request, methods){ // methods => object of Methods
    const r_body = await request.json(); // request body

    return Response.json(await methods[r_body.method](r_body.query)); // send method result
}