/*
* Title: Token Handler
* Description: Handler to handle token Related routes
* Author: Learn With Sumit
* Learner: Itminan
* Date: 16/7/2024
*/

// dependencies
const data = require("../../lib/data");
const { hash, parseJSON, createRandomString } = require("../../helpers/utilities");

// module scaffolding
const handler = {};

// sample handler
handler.tokenHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._token[requestProperties.method](requestProperties, callback);
    } else {
        // status code for restricted access
        callback(405);
    }
    // console.log(requestProperties);
}

// scaffolding for request methods of user
handler._token = {};

// post method
handler._token.post = (requestProperties, callback) => {
    const phone = typeof (requestProperties.body.phone) === "string" && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    if (phone && password) {
        data.read("users", phone, (err1, userData) => {
            let hashedPassword = hash(password);
            if (hashedPassword === parseJSON(userData).password) {
                let tokenId = createRandomString(20);
                let expires = Date.now() + 3600 * 1000; // milliseconds
                let tokenObject = {
                    "id": tokenId,
                    phone,
                    expires
                };
                data.create("tokens", tokenId, tokenObject, (err2) => {
                    if (!err2) {
                        callback(200, tokenObject);
                    } else {
                        callback(500, {
                            "error": "There was a problem saving the token!!!"
                        })
                    }
                })
            } else {
                callback(400, {
                    "error": "Password is not valid!!!"
                })
            }
        })
    } else {
        callback(400, {
            "error": "You have a probem in your request"
        })
    }
}

// get method
handler._token.get = (requestProperties, callback) => {
    const id = typeof (requestProperties.queryStringObject.id) === "string" && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if (id) {
        // lookup the token
        data.read("tokens", id, (err, tokenData) => {
            const token = { ...parseJSON(tokenData) };
            if (!err && token) {
                callback(200, token);
            } else {
                callback(404, {
                    error: "Requested token was not found!!!"
                });
            }
        })
    } else {
        callback(404, {
            error: "token number incorrect!!!"
        });
    }
}

// put method
handler._token.put = (requestProperties, callback) => {
    const id = typeof (requestProperties.body.id) === "string" && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;

    const extend = typeof (requestProperties.body.extend) === "boolean" && requestProperties.body.extend === true ? true : false;

    if(id && extend) {
        data.read("tokens", id, (err1, tokenData) => {
            let tokenObject = parseJSON(tokenData);
            if(tokenObject.expires > Date.now()) {
                tokenObject.expires = Date.now() + 3600 * 1000;
                // store the updated token
                data.update("tokens", id, tokenObject, (err2) => {
                    if(!err2) {
                        callback(200);
                    } else {
                        callback(500, {
                            error: "There was an error updating the token!!!"
                        });
                    }
                })
            } else {
                callback(400, {
                    error: "Token Already expired!!!"
                });
            }
        })
    } else {
        callback(400, {
            error: "There was a problem in your token request!!!"
        });
    }
}

// delete method
handler._token.delete = (requestProperties, callback) => {

}

module.exports = handler;