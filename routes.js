/*
* Title: Routes
* Description: Application Routes
* Author: Learn With Sumit
* Learner: Itminan
* Date: 11/6/2024
*/

// dependencies
const { sampleHandler } = require("./handlers/routeHandlers/sampleHandler");
const { userHandler } = require("./handlers/routeHandlers/userHandler");
const { tokenHandler } = require("./handlers/routeHandlers/tokenHandler");

// route
const routes = {
    "sample": sampleHandler,
    "user": userHandler,
    "token": tokenHandler,
};

module.exports = routes;