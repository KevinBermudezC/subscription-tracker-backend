import arcjet, {shield, detectBot, tokenBucket} from "@arcjet/node";
import { ARCJET_KEY } from "./env.js";

const aj = arcjet({
    key: ARCJET_KEY,
    ipSource: (req) => req.headers["x-forwarded-for"] || req.socket.remoteAddress,
    characteristics: ["ip.src"],
    rules: [
        shield({ 
            mode: "LIVE",
            allowUnknownIPs: true // Allow requests even if IP detection fails
        }),
        detectBot({
            mode: "LIVE",
            allow: ["CATEGORY:SEARCH_ENGINE", "CATEGORY:BROWSER"],
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