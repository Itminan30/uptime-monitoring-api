/*
* Title: User Handler
* Description: Handler to handle user Related routes
* Author: Learn With Sumit
* Learner: Itminan
* Date: 22/6/2024
*/

// module scaffolding
const handler = {};

// sample handler
handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if(acceptedMethods.indexOf(requestProperties.method) > -1) {
        handler._user[requestProperties.method](requestProperties, callback);
    } else {
        // status code for restricted access
        callback(405);
    }
    // console.log(requestProperties);
}

// scaffolding for request methods of user
handler._user = {};

// post method
handler._user.post = (requestProperties, callback) => {

}

// get method
handler._user.get = (requestProperties, callback) => {

}

// put method
handler._user.put = (requestProperties, callback) => {

}

// delete method
handler._user.delete = (requestProperties, callback) => {

}

module.exports = handler;