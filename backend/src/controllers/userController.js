import User from "../models/User.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/jwt.js";

// fetch all users from db
export async function getAllUsers(req, res, next){
    try{
        const users = await User.find();
        // const users = await User.find().sort({ createdAT: -1 }); -1 will sort in desc. order (newest first)
        res.status(200).json({"message": "Users retrieved successfully!", users});
    } catch (error){
        // console.error("Error in getAllUsers: ", error);
        // res.status(500).json({"message": "Internal server error"});
        next(error);
    }
} 

// fetch a single user by getting id from query parameter
export async function getUserById(req, res, next){
    try{
        const user = await User.findById(req.params.id);
        if (!user)
            return res.status(404).json({ "message": "User not found!" });
        res.status(200).json({"message": "User found successfully!", user});
    }catch(error){
        next(error);
    }
}

// Create a new user
export async function createUser(req, res, next){
    try{
        const { name, email, password, role, permissions, tasks } = req.body;
        const user = new User({ name, email, password, role, permissions, tasks });

        // checking if email already exist
        const isExist = await User.findOne({ email });
        if(isExist)
            return res.status(409).json({"message": "Email already in use"});

        // save user record in db
        const savedUser = await user.save();
        res.status(201).json({"message": "User created successfully!", savedUser});
    }catch (error){
        next(error);
    }
}

// Update a specific user by id
export async function updateUser(req, res, next){
    try{
        const { name, email, role, permissions, tasks } = req.body;
        // checking if user exist ------ already checking in util/userValidation
        // const user = await User.findById(req.params.id);
        // console.log(user);
        // if(!user)
        //     return res.status(404).json({ message: "User not found!" });

        // update only safe fields, avoid undefined/null fields
        let user = {};
        if(name) user.name = name;
        if(email) user.email = email;
        if(role) user.role = role;
        if(permissions) user.permissions = permissions;
        if(tasks) user.tasks = tasks;

        const updateUser = await User.findByIdAndUpdate(req.params.id, user, {new: true});
        if(!updateUser)
            return res.status(404).json({"message": "User not found!"});
        res.status(200).json({"message": "User updated successfully!", updateUser});
    }catch(error){
        next(error);
    }
}

// Delete a user by id
export async function deleteUser(req, res, next){
    try{
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser)
            return res.status(404).json({"message": "User not found!"});
        res.status(200).json({"message": "User deleted successfully!"})
    }catch(error){
        next(error);
    }
}

export async function login(req, res, next){
    try{
        const { email, password } = req.body;
        const user = await User.findOne({ email }).select('+password');
        if(!user)
            return res.status(400).json({ "message": "Invalid email or password"});

        const isMatch = await user.comparePassword(password);
        if(!isMatch)
            return res.status(400).json({ "message": "Invalid email or password"});

        const payload = { id: user._id, email: user.email };
        const accessToken = generateAccessToken(payload);
        const refreshToken = generateRefreshToken(payload);

        res.status(200).json({"message": "Login successful!!", accessToken, refreshToken});
    }catch(error){
        next(error);
    }
}

// Refresh token - POST API
export async function refreshToken(req, res, next) {
    const { refreshToken } = req.body;
    if(!refreshToken)
        return res.status(401).json({ erroe: "No token provided!" });

    try{
        const payload = verifyRefreshToken(refreshToken); // verify refresh token, sent earlier
        const accessToken = generateAccessToken({ id: payload.id, email: payload.email }); // generate new token
        res.status(200).json({"message": "Token refreshed successfully!", accessToken }); // send new access token
    }catch(error){
        next(error);
    }
}
