import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

/**
 * Extracts the PORT and NODE_ENV environment variables from the process.env object.
 * 
 * @constant {string} PORT - The port number on which the server will listen.
 * @constant {string} NODE_ENV - The environment in which the server is running (e.g., development, production).
 * @constant {string} DB_URI - The URI of the MongoDB database.
 * @constant {string} JWT_SECRET - The secret key used to sign the JWT.
 * @constant {string} JWT_EXPIRES_IN - The expiration time for the JWT.
 * @constant {string} ARCJET_KEY - The ArcJet API key.
 * @constant {string} ARCJET_ENV - The environment in which the ArcJet API is running.
 * @constant {string} QSTASH_URL - The URL of the QStash API.
 * @constant {string} QSTASH_TOKEN - The token used to authenticate with the QStash API
 * @constant {string} SERVER_URL - The URL of the server
*/

export const { 
    PORT, 
    NODE_ENV, 
    DB_URI, 
    JWT_SECRET, 
    JWT_EXPIRES_IN,
    ARCJET_KEY,
    ARCJET_ENV,
    QSTASH_URL,
    QSTASH_TOKEN,
    SERVER_URL 
} = process.env;