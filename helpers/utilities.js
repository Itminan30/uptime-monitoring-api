/*
* Title: Utilities
* Description: Important Utility related functions
* Author: Learn With Sumit
* Learner: Itminan
* Date: 22/6/2024
*/

// dependencies

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

// module to export
module.exports = utilities;
