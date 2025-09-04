import bcrypt from "bcrypt";

const saltRounds = 10; // make it to 12 or 14 for a stronger security based on server capacity(it affects the server performance)

// Hash a password
export async function hashPassword (password) {
    return await bcrypt.hash(password, saltRounds);
}

// Verify a password
export async function verifyPassword (password, hashedPassword) {
    console.log("in password verify.. ");
    return await bcrypt.compare(password, hashedPassword);
}
