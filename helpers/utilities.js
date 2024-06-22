/*
* Title: Utilities
* Description: Important Utility related functions
* Author: Learn With Sumit
* Learner: Itminan
* Date: 22/6/2024
*/

// dependencies
const crypto = require("crypto");
const environment = require("./environments");

// module scaffolding
const utilities = {};

// parse json to object
utilities.parseJSON = (jsonString) => {
    let output;

    try {
        output = JSON.parse(jsonString);
    } catch (error) {
        output = {};
    }

    return output;
}

// hash a string
utilities.hash = (str) => {
    if(typeof(str) === "string", str.length > 0) {
        let hash = crypto.createHmac("sha256", environment.secretKey).update(str).digest("hex");
        return hash;
    } else {
        return false;
    }
    
}
// module to export
module.exports = utilities;
