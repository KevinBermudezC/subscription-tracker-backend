import arcjet, {shield, detectBot, tokenBucket} from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
    key: ARCJET_KEY,
    ipSource: () => "127.0.0.1", // Force a valid IPv4 address for Docker environment
    characteristics: ["ip.src"],
    rules: [
        shield({ 
            mode: "LIVE",
            allowUnknownIPs: true // Allow requests even if IP detection fails
        }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE"],
        }),
        tokenBucket({
            mode: "LIVE",
            refillRate: 5,
            interval: 10,
            capacity: 10,
        }),
    ],
});

export default aj;