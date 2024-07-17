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
const { checkHandler } = require("./handlers/routeHandlers/checkHandler")

// route
const routes = {
    "sample": sampleHandler,
    "user": userHandler,
    "token": tokenHandler,
    "check": checkHandler
};

module.exports = routes;