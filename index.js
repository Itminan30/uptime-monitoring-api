/*
* Title: Uptime Monitoring Application
* Description: A RESTFul API to monitor up or down time of user defined links
* Author: Sumit Saha
* Learner: Itminan
* Date: 11/6/2024
*/

// dependencies
const http = require("http");
const url = require("url");
const { StringDecoder } = require("string_decoder");

// app object - module scaffolding
const app = {};

// configuration
app.config = {
    port: 3000
};

// create server
app.createServer = () => {
    const server = http.createServer(app.handleReqRes);
    server.listen(app.config.port, () => {
        console.log("Server listening on port: ", app.config.port);
    })
}

// handle request response
app.handleReqRes = (req, res) => {
    // handle request
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;

    const decoder = new StringDecoder("utf-8");
    let realData = '';

    req.on("data", (buffer) => {
        realData += decoder.write(buffer);
    })

    req.on("end", () => {
        realData += decoder.end();

        console.log(queryStringObject, method, trimmedPath, headerObject, realData);
        res.end("Hello programmers");
    })

    console.log(queryStringObject, method, trimmedPath, headerObject);
    // handle response
    
}

// start server
app.createServer();