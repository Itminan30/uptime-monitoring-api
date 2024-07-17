/*
* Title: Environments
* Description: Handle All Environment Related Things
* Author: Learn With Sumit
* Learner: Itminan
* Date: 12/6/2024
*/

// dependencies

// module scaffolding
const environments = {};

environments.staging = {
    port: 3000,
    envName: "staging",
    secretKey: "asdfasdfasdf",
    maxChecks: 5
}

environments.production = {
    port: 5000,
    envName: "production",
    secretKey: "fdsafdsafdsa",
    maxChecks: 5
}

// environment
const currentEnvironment = typeof(process.env.NODE_ENV) === "string" ? process.env.NODE_ENV : "staging";

// environment to export 
const environmentToExport = typeof(environments[currentEnvironment]) === "object" ? environments[currentEnvironment] : environments.staging;

// module to export
module.exports = environmentToExport;
