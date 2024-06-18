/*
* Title: Not Found Handler
* Description: 404 Not Found Handler
* Author: Learn With Sumit
* Learner: Itminan
* Date: 11/6/2024
*/

// module scaffolding
const handler = {};

// sample handler
handler.notFoundHandler = (requestProperties, callback) => {
    console.log(requestProperties);
    callback(404, {
        message: "This is a payload from notFoundHanlder"
    });
}

module.exports = handler;