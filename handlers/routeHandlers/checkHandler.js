/*
* Title: Check Handler
* Description: Handler to handle user Related checks
* Author: Learn With Sumit
* Learner: Itminan
* Date: 17/7/2024
*/

// dependencies
const data = require("../../lib/data");
const { hash, parseJSON } = require("../../helpers/utilities");
const tokenHandler = require("./tokenHandler");

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
    
}

// get method
handler._check.get = (requestProperties, callback) => {
    
}

// put method
handler._check.put = (requestProperties, callback) => {
    
}

// delete method
handler._check.delete = (requestProperties, callback) => {
    
}

module.exports = handler;