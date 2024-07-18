/*
* Title: Check Handler
* Description: Handler to handle user Related checks
* Author: Learn With Sumit
* Learner: Itminan
* Date: 17/7/2024
*/

// dependencies
const data = require("../../lib/data");
const { hash, parseJSON, createRandomString } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");
const { maxChecks } = require("../../helpers/environments");

// module scaffolding
const handler = {};

// sample handler
handler.checkHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._check[requestProperties.method](requestProperties, callback);
    } else {
        // status code for restricted access
        callback(405);
    }
    // console.log(requestProperties);
}

// scaffolding for request methods of user
handler._check = {};

// post method
handler._check.post = (requestProperties, callback) => {
    // validate inputs
    let protocol = typeof (requestProperties.body.protocol) === "string" && ["http", "https"].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;

    let url = typeof (requestProperties.body.url) === "string" && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    let method = typeof (requestProperties.body.method) === "string" && ["get", "post", "put", "delete"].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

    let successCodes = typeof (requestProperties.body.successCodes) === "object" && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;

    let timeoutSeconds = typeof (requestProperties.body.timeoutSeconds) === "number" && requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;

    if (protocol && url && method && successCodes && timeoutSeconds) {
        // Get token form header
        let token = typeof (requestProperties.headerObject.token) === "string" ? requestProperties.headerObject.token : false;

        // lookup the user phone by reading the token
        data.read("tokens", token, (err1, tokenData) => {
            if (!err1 && tokenData) {
                let userPhone = parseJSON(tokenData).phone;
                // lookup userdata
                data.read("users", userPhone, (err2, userData) => {
                    if (!err2 && userData) {
                        // Verify token
                        tokenHandler._token.varify(token, userPhone, (validation) => {
                            if (validation) {
                                let userObject = parseJSON(userData);
                                let userChecks = typeof (userObject.checks) === "object" && userObject.checks instanceof Array ? userObject.checks : [];

                                if (userChecks.length < maxChecks) {
                                    let checkId = createRandomString(20);
                                    let checkObject = {
                                        "id": checkId,
                                        userPhone,
                                        protocol,
                                        url,
                                        method,
                                        successCodes,
                                        timeoutSeconds
                                    };
                                    // save the object
                                    data.create("checks", checkId, checkObject, (err3) => {
                                        if (!err3) {
                                            // add cheakId to the user object
                                            // userObject.checks = userChecks;
                                            // userObject.checks.push(checkId);
                                            userChecks.push(checkId);
                                            userObject.checks = userChecks;

                                            // save the new user data
                                            data.update("users", userPhone, userObject, (err4) => {
                                                if (!err4) {
                                                    // return the data about the new check
                                                    callback(200, checkObject);
                                                } else {
                                                    callback(500, {
                                                        "error": "There was a problem Updating user after adding checks!!!"
                                                    });
                                                }
                                            })
                                        } else {
                                            callback(500, {
                                                "error": "There was a problem creating checks!!!"
                                            });
                                        }
                                    })
                                } else {
                                    callback(401, {
                                        "error": "User has already reached max check limit!!!"
                                    });
                                }
                            } else {
                                callback(403, {
                                    "error": "Token not valid!!!"
                                });
                            }
                        })
                    } else {
                        callback(404, {
                            "error": "User Not found"
                        });
                    }
                })
            } else {
                callback(403, {
                    "error": "Authentication Problem!"
                });
            }
        })
    } else {
        callback(400, {
            "error": "You have a probem in your request"
        });
    }
}

// get method
handler._check.get = (requestProperties, callback) => {
    const id = typeof (requestProperties.queryStringObject.id) === "string" && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if (id) {
        // lookup the check
        data.read("checks", id, (err, checkData) => {
            if (!err && checkData) {
                // Get token from header data
                let token = typeof (requestProperties.headerObject.token) === "string" ? requestProperties.headerObject.token : false;
                // Verify token data
                tokenHandler._token.varify(token, parseJSON(checkData).userPhone, (validation) => {
                    if (validation) {
                        callback(200, parseJSON(checkData));
                    } else {
                        callback(403, {
                            "error": "Token Authentication failed!!!"
                        });
                    }
                });
            } else {
                callback(500, {
                    "error": "Server side error for getting check data"
                });
            }
        })
    } else {
        callback(400, {
            "error": "You have a probem in your request"
        });
    }
}

// put method
handler._check.put = (requestProperties, callback) => {
    const id = typeof (requestProperties.body.id) === "string" && requestProperties.body.id.trim().length === 20 ? requestProperties.body.id : false;

    // validate inputs
    let protocol = typeof (requestProperties.body.protocol) === "string" && ["http", "https"].indexOf(requestProperties.body.protocol) > -1 ? requestProperties.body.protocol : false;

    let url = typeof (requestProperties.body.url) === "string" && requestProperties.body.url.trim().length > 0 ? requestProperties.body.url : false;

    let method = typeof (requestProperties.body.method) === "string" && ["get", "post", "put", "delete"].indexOf(requestProperties.body.method) > -1 ? requestProperties.body.method : false;

    let successCodes = typeof (requestProperties.body.successCodes) === "object" && requestProperties.body.successCodes instanceof Array ? requestProperties.body.successCodes : false;

    let timeoutSeconds = typeof (requestProperties.body.timeoutSeconds) === "number" && requestProperties.body.timeoutSeconds % 1 === 0 && requestProperties.body.timeoutSeconds >= 1 && requestProperties.body.timeoutSeconds <= 5 ? requestProperties.body.timeoutSeconds : false;

    if (id) {
        if (protocol || url || method || successCodes || timeoutSeconds) {
            // read checkdata for phone number
            data.read("checks", id, (err1, checkData) => {
                if (!err1 && checkData) {
                    // Extract checkObject
                    const checkObject = parseJSON(checkData);
                    // Get token data from header
                    let token = typeof (requestProperties.headerObject.token) === "string" ? requestProperties.headerObject.token : false;
                    // Check validity of token
                    tokenHandler._token.varify(token, checkObject.userPhone, (validation) => {
                        if (validation) {
                            if (protocol) {
                                checkObject.protocol = protocol;
                            }
                            if (method) {
                                checkObject.method = method;
                            }
                            if (url) {
                                checkObject.url = url;
                            }
                            if (successCodes) {
                                checkObject.successCodes = successCodes;
                            }
                            if (timeoutSeconds) {
                                checkObject.timeoutSeconds = timeoutSeconds;
                            }

                            // update the checked object
                            data.update("checks", id, checkObject, (err2) => {
                                if (!err2) {
                                    callback(200);
                                } else {
                                    callback(500, {
                                        "error": "Server failed to update check!!!"
                                    });
                                }
                            })
                        } else {
                            callback(403, {
                                "error": "Token Authentication failed!!!"
                            });
                        }
                    });

                } else {
                    callback(500, {
                        "error": "Error reading check data!!!"
                    });
                }
            })
        } else {
            callback(400, {
                "error": "You must provide atleast one field to update!!!"
            });
        }
    } else {
        callback(400, {
            "error": "You have a probem in your request"
        });
    }
}

// delete method
handler._check.delete = (requestProperties, callback) => {
    const id = typeof (requestProperties.queryStringObject.id) === "string" && requestProperties.queryStringObject.id.trim().length === 20 ? requestProperties.queryStringObject.id : false;

    if (id) {
        // lookup the check
        data.read("checks", id, (err, checkData) => {
            if (!err && checkData) {
                // Get token from header data
                let token = typeof (requestProperties.headerObject.token) === "string" ? requestProperties.headerObject.token : false;
                // Verify token data
                tokenHandler._token.varify(token, parseJSON(checkData).userPhone, (validation) => {
                    if (validation) {
                        // delete checks data
                        data.delete("checks", id, (err1) => {
                            if (!err1) {
                                // delete the check id from userdata
                                data.read("users", parseJSON(checkData).userPhone, (err2, userData) => {
                                    let userObject = parseJSON(userData);
                                    if(!err2 && userData) {
                                        let userChecks = typeof(userObject.checks) === "object" && userObject.checks instanceof Array ? userObject.checks : [];

                                        // remove the deleted checkId form the checks array.
                                        let checkPosition = userChecks.indexOf(id);
                                        if(checkPosition > -1) {
                                            userChecks.splice(checkPosition, 1);
                                            
                                            // resave the user data
                                            userObject.checks = userChecks;
                                            data.update("users", userObject.phone, userObject, (err3) => {
                                                if(!err3) {
                                                    callback(200);
                                                } else {
                                                    callback(500, {
                                                        "error": "Server side error for updating new user data"
                                                    });
                                                }
                                            })
                                        } else {
                                            callback(500, {
                                                "error": "The checkId to be removed is not found!!!"
                                            });
                                        }
                                    } else {
                                        callback(500, {
                                            "error": "Server side error for reading user data"
                                        });
                                    }
                                })
                            } else {
                                callback(500, {
                                    "error": "Server side error for deleting check data"
                                });
                            }
                        })
                    } else {
                        callback(403, {
                            "error": "Token Authentication failed!!!"
                        });
                    }
                });
            } else {
                callback(500, {
                    "error": "Server side error for getting check data"
                });
            }
        })
    } else {
        callback(400, {
            "error": "You have a probem in your request"
        });
    }
}

module.exports = handler;