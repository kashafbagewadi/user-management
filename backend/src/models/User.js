import mongoose from "mongoose";
import { hashPassword, verifyPassword } from "../utils/password.js";

// 1. Create a schema
// 2. Create model based off that schema
// 3. Hash & verify password

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: 3,
        minLength: 3
    },
    email: {
        type: String,
        required: true,
        index: true //as an index, easy to query from email index
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
        select: false // de-select the password in get requests
    },
    role:{
        type: String,
        enum: ['user', 'admin'],
        default: 'user',
        required: true,
        index: true
    },
    permissions:{
        type: Array
    },
    tasks:{
        type: Array
    }
}, {
    timestamps: true, // it will create createdAt, updatedAt
    discriminatorKey: "role" // for a multi-user site, a common user schema can inherit by roles: admin, client, seller etc
});

// Hash a password before saving in DB - using pre hook
userSchema.pre('save', async function (next) {
    if(!this.isModified('password'))
        return next();
    this.password = await hashPassword(this.password);
    next();
});

// Instance method to compare password
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await verifyPassword(candidatePassword, this.password);
};

const User = mongoose.model("User", userSchema)
export default User;