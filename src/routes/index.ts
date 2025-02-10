import express from "express";
import { userRoutes } from "./user";
import { channelRoutes } from "./channel";
import { roomRouter } from "./room";

const router = express.Router()

router.use('/user', userRoutes)
router.use('/room', roomRouter)
router.use('/channel', channelRoutes)

export { router }