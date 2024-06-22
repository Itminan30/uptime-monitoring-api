/*
* Title: User Handler
* Description: Handler to handle user Related routes
* Author: Learn With Sumit
* Learner: Itminan
* Date: 22/6/2024
*/

// dependencies
const data = require("../../lib/data");
const { hash } = require("../../helpers/utilities");

// module scaffolding
const handler = {};

// sample handler
handler.userHandler = (requestProperties, callback) => {
    const acceptedMethods = ["get", "post", "put", "delete"];
    if (acceptedMethods.indexOf(requestProperties.method) > -1) {
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
    // data sanitization and validation
    const firstName = typeof (requestProperties.body.firstName) === "string" && requestProperties.body.firstName.trim().length > 0 ? requestProperties.body.firstName : false;

    const lastName = typeof (requestProperties.body.lastName) === "string" && requestProperties.body.lastName.trim().length > 0 ? requestProperties.body.lastName : false;

    const phone = typeof (requestProperties.body.phone) === "string" && requestProperties.body.phone.trim().length === 11 ? requestProperties.body.phone : false;

    const password = typeof (requestProperties.body.password) === "string" && requestProperties.body.password.trim().length > 0 ? requestProperties.body.password : false;

    const tosAgreement = typeof (requestProperties.body.tosAgreement) === "boolean" ? requestProperties.body.tosAgreement : false;

    // 
    if (firstName && lastName && phone && password && tosAgreement) {
        // check if the user already exists
        data.read("users", phone, (err) => {
            if (err) {
                let userObject = {
                    firstName,
                    lastName,
                    phone,
                    password: hash(password),
                    tosAgreement
                };
                // store data in db
                data.create("users", phone, userObject, (err2) => {
                    if(!err2) {
                        callback(200, {
                            message: "User was created successfully!!!"
                        })
                    } else {
                        callback(500, {
                            error: "Error creating user!!!"
                        })
                    }
                })
            } else {
                callback(500, {
                    "error": "User already exists or there was an error in server side"
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
handler._user.get = (requestProperties, callback) => {

}

// put method
handler._user.put = (requestProperties, callback) => {

}

// delete method
handler._user.delete = (requestProperties, callback) => {

}

module.exports = handler;