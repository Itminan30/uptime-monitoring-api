/*
* Title: Token Handler
* Description: Handler to handle token Related routes
* Author: Learn With Sumit
* Learner: Itminan
* Date: 16/7/2024
*/

// dependencies
const data = require("../../lib/data");
const { hash, parseJSON } = require("../../helpers/utilities");

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
    
}

// get method
handler._token.get = (requestProperties, callback) => {
    
}

// put method
handler._token.put = (requestProperties, callback) => {
    
}

// delete method
handler._token.delete = (requestProperties, callback) => {
    
}

module.exports = handler;