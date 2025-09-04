import express from 'express';
import { createUser, deleteUser, getAllUsers, getUserById, updateUser, login, refreshToken } from '../controllers/userController.js';
import errorMiddleware from '../middlewares/error.middleware.js';
import { validateRequest } from '../middlewares/validateRequest.js';
import { createUserValidator, updateUserValidator, deleteUserValidator } from '../utils/userValidator.js';
import { authenticateToken } from '../middlewares/auth.js';

const router = express.Router();

router.get("/", authenticateToken, getAllUsers, errorMiddleware);
router.post("/", createUserValidator, validateRequest, createUser, errorMiddleware);
router.get("/:id", authenticateToken, getUserById, errorMiddleware);
router.put("/:id", authenticateToken, updateUserValidator, validateRequest, updateUser, errorMiddleware);
router.delete("/:id", authenticateToken, deleteUserValidator, validateRequest, deleteUser, errorMiddleware);

// auth
router.post("/login", login, errorMiddleware);
router.post("/refresh", refreshToken, errorMiddleware);

export default router;