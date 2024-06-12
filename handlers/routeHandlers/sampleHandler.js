/*
* Title: Sample Handler
* Description: Sample Handler
* Author: Learn With Sumit
* Learner: Itminan
* Date: 11/6/2024
*/

// module scaffolding
const handler = {};

// sample handler
handler.sampleHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(200, {
        message: "This is a payload from sampleHanlder"
    });
}

module.exports = handler;