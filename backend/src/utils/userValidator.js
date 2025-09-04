import { body, param } from "express-validator";
import User from "../models/User.js";

export const createUserValidator = [
    body("name")
        .trim() // remove leading/trailing spaces
        .escape() // escape HTML entities (<, >, &, etc.)
        .isString()
        .notEmpty().withMessage("Name cannot be empty!")
        .isLength({ min: 3 }).withMessage("Name must be at-least 3 characters long!"),
    body("email")
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Invalid email address!"),
    body("password")
        .isLength({ min: 6 }).withMessage("Password must be at-least 6 characters long!")
];

export const updateUserValidator = [
    param("id")
        .isMongoId().withMessage("Invalid user id format!")
        .custom(async (id) => { // checking if user exist in database
            const user = await User.findById(id);
            if(!user) {
                return Promise.reject("User not found!!!");
            }
        }),
    body("name")
        .optional()
        .trim()
        .escape()
        .isString().withMessage("Name must be a string!")
        .isLength({ min: 3 }).withMessage("Name must be at-least 3 characters long!"),
    body("email")
        .optional()
        .trim()
        .normalizeEmail()
        .isEmail().withMessage("Invalid email address!"),
    body("role")
        .optional()
        .trim()
        .escape()
        .isString().withMessage("role must be a string!")
        .isLength({ min: 3 }).withMessage("Name must be at-least 3 characters long!"),
];

export const deleteUserValidator = [
    param("id")
        .isMongoId().withMessage("Invalid user id format!")
        .custom(async (id) => { // checking if user exist in database
            const user = await User.findById(id);
            if(!user) {
                return Promise.reject("User not found!");
            }
        }),
];