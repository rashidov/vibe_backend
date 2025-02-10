import express from 'express'
import { channelController } from '../controllers/ChannelController'

const channelRoutes = express.Router()

channelRoutes.get('/all', channelController.getAll as any)

export { channelRoutes }
