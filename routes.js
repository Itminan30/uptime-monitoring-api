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

// route
const routes = {
    "sample": sampleHandler,
    "user": userHandler
};

module.exports = routes;