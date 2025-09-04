import jwt from "jsonwebtoken";

// Generate access token (short-lived)
export function generateAccessToken(payload) {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.sign(payload, JWT_SECRET, { expiresIn:'15m'}); // 15 minutes
}

// Generate refresh token (long-lived)
export function generateRefreshToken(payload) {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    return jwt.sign(payload, JWT_REFRESH_SECRET, { expiresIn: '7d' }); // 7 days
}

// Verfiy access token
export function verifyToken(token) {
    const JWT_SECRET = process.env.JWT_SECRET;
    return jwt.verify(token, JWT_SECRET);
}

// Verify refresh token
export function verifyRefreshToken(rToken) {
    const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET;
    return jwt.verify(rToken, JWT_REFRESH_SECRET);
}

