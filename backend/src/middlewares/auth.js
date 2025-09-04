import jwt from "jsonwebtoken";

// authenticate token for each request
export function authenticateToken(req, res, next) {
    const JWT_SECRET = process.env.JWT_SECRET;
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if(!token)
        return res.status(401).json({ error: "Access denied!" });

    jwt.verify(token, JWT_SECRET, (err, user) => {
        if(err)
            return res.status(403).json({ error: "Invalid or expired token!" });
        
        req.user = user; // attach decoded payload
        next();
    })
} 