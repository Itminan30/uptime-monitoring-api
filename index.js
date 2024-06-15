/*
* Title: Uptime Monitoring Application
* Description: A RESTFul API to monitor up or down time of user defined links
* Author: Learn With Sumit
* Learner: Itminan
* Date: 11/6/2024
*/

// dependencies
const http = require("http");
const { handleReqRes } = require("./helpers/handleReqRes");
const environment = require("./helpers/environments");
const { env } = require("process");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(environment.port, () => {
        console.log("Server listening on port: ", environment.port);
    })
}

// handle request response
app.handleReqRes = handleReqRes;

// start server
app.createServer();