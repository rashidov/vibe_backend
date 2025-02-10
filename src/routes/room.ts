import express from 'express'
import { roomController } from '../controllers/RoomController'

const roomRouter = express.Router()

roomRouter.get('/all', roomController.getAll as any)

export { roomRouter }
