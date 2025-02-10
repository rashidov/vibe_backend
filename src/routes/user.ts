import express from "express";
import {userController} from "../controllers/UserController";

const userRoutes = express.Router()

userRoutes.get('/',userController.getAll as any)
userRoutes.post('/', userController.registration as any)

export { userRoutes }