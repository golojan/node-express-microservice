"use strict";

const HOST = process.env.HOST || "localhost";
const ENVIRONMENTS = {
    "dev": "dev",
    "test": "test",
    "stage": "stage",
    "prod": "production",
};
const ENV = (process.env.ENV || process.env.NODE_ENV) || ENVIRONMENTS.dev;
const PORT = process.env.PORT || 8080;
const JWT_SECRET =  process.env.JWT_SECRET || "secret";
const JWT_EXPIRY =  process.env.JWT_EXPIRY || "1d";

const CONNECTIONS  = {
    "DATA" : "DATA",
    "MONGO" : "MONGO",
    "REDIS" : "REDIS"
};
export default {
    ENVIRONMENTS,
    ENV,
    PORT,
    HOST,
    CONNECTIONS,
    JWT_SECRET,
    JWT_EXPIRY,
};
