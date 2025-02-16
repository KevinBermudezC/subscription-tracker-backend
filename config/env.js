import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

/**
 * Extracts the PORT and NODE_ENV environment variables from the process.env object.
 * 
 * @constant {string} PORT - The port number on which the server will listen.
 * @constant {string} NODE_ENV - The environment in which the server is running (e.g., development, production).
*/

export const { PORT, NODE_ENV } = process.env;