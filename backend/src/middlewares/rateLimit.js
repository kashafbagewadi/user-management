import rateLimit from "express-rate-limit";

// Rate Limiter : adjust the threshold as per requirement
export const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, //15 minutes
    max: 300, // 300 req per WindowMs from each IP
    message: 'Too many requests, please try again later!',
    headers: true // adds rateLimit header in responses
});