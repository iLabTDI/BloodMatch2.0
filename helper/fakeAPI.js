const api = {
    "/data/users": {
        GET: () => {
            const data = require("./users.json")
            return data
        },
    }
}

export default class fakeAPI {

    async fetch(endpoint, req) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                if (api[endpoint]) {
                    if (api[endpoint][req.Method]) {

                        const res = {
                            status: 200,
                            resultSet: api[endpoint][req.Method]()
                        }
                        resolve(res)

                    } else {

                        const res = {
                            status: 400,
                            error: "Bad HTTP request"
                        }
                        reject(res)

                    }
                } else {

                    const res = {
                        status: 400,
                        error: "Bad HTTP request"
                    }
                    reject(res)
                    
                }
            }, 0)
        })

    }


}


// export function fakeAPI() {}