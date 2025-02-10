import express from 'express'
import { userService } from '../services/UserService'
import { roomService } from '../services/RoomService'
import { User } from '../types/user'

class UserController {
  getAll(req: express.Request, res: express.Response) {
    const users = userService.getAllUsers()
    return res.status(200).send(users)
  }
  registration(req: express.Request<User>, res: express.Response) {
    if (!req.body?.login) return res.status(404).send({ message: 'Not found!' })
    const candidate = req.body.login
    const result = userService.createUser(candidate)
    return res.status(200).send(result)
  }
}

export const userController = new UserController()
