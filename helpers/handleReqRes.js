/*
* Title: Handle Request Response
* Description: This file handles Request and Response
* Author: Learn With Sumit
* Learner: Itminan
* Date: 11/6/2024
*/

// dependecies
const url = require("url");
const { StringDecoder } = require("string_decoder");
const routes = require("../routes");
const { notFoundHandler } = require("../handlers/routeHandlers/notFoundHandler");

// module scaffolding
const handler = {};

// handler function
handler.handleReqRes = (req, res) => {
    // handle request
    const parsedUrl = url.parse(req.url, true);
    const path = parsedUrl.pathname;
    const trimmedPath = path.replace(/^\/|\/$/g, '');
    const method = req.method.toLowerCase();
    const queryStringObject = parsedUrl.query;
    const headerObject = req.headers;

    const decoder = new StringDecoder("utf-8");
    let realData = '';

    const requestProperties = {
        parsedUrl,
        path,
        trimmedPath,
        method,
        queryStringObject,
        headerObject
    };

    const chosenFunction = routes[trimmedPath] ? routes[trimmedPath] : notFoundHandler;

    req.on("data", (buffer) => {
        realData += decoder.write(buffer);
    })

    req.on("end", () => {
        realData += decoder.end();

        chosenFunction(requestProperties, (statusCode, payload) => {
            statusCode = typeof (statusCode) === "number" ? statusCode : 500;
            payload = typeof (payload) === "object" ? payload : {};
            const payloadString = JSON.stringify(payload);

            // return the final response
            res.writeHead(statusCode);
            res.end(payloadString);
        });
    })
    // handle response
}

// export module
module.exports = handler;