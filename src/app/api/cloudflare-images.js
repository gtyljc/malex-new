
class CloudflareError extends Error {
    constructor (msg, code){
        super(
            `Error ${code}: ${msg}`
        );
        this.name = "CloudflareError";
    }
}

class CloudflareImages {
    constructor(){
        this.defaultUrl = process.env.CLOUDFLARE_API_URL + process.env.CLOUDFLARE_ACCOUNT_ID + "/images/v1";
    }

    async #sendRequest(url, method, body=null, many=false){ // many => is an array of images in response
        const response = await (
            await fetch(
                url,
                {
                    method, 
                    headers: {

                        // via TOKEN
                        "Authorization": `Bearer ${process.env.CLOUDFLARE_API_TOKEN}`
                    },
                    body
                }
            )
        ).json();

        if (response.success){
            return many ? {
                data: response.result.images,
                status: 200
            }: {
                data: response.result,
                status: 200
            }
        }
        else {
            throw new CloudflareError(
                response.errors[0].message,
                response.errors[0].code
            );
        }
    }

    // returns one result object
    async uploadImage(img) { // img => instance of file
        const body = new FormData();

        // setup
        body.append("file", img);

        return await this.#sendRequest(this.defaultUrl, "POST", body);
    }

    async deleteImage(img_id) {
        return await this.#sendRequest(
            this.defaultUrl + `/${img_id}`,
            "DELETE"
        );
    }

    async listImages() {

    }
}

export default CloudflareImages;