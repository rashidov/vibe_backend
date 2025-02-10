import express from "express";
import { userRoutes } from "./user";
import { channelRoutes } from "./channel";

const router = express.Router()

router.use('/user', userRoutes)
router.use('/channel', channelRoutes)

export { router }