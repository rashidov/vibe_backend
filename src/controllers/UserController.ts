import express from "express";
import { userService } from "../services/UserService";
import { roomService } from "../services/RoomService";
import {User} from "../types/user";

class UserController {
  getAll(req: express.Request, res: express.Response) {
    const users = userService.getAllUsers()
    return res.status(200).send({ users })
  }
  registration(req: express.Request<User>, res: express.Response) {
    const candidate = req.body
    const user = userService.create(candidate)
    const room = roomService.createRoom({
      maintainer: user.id,
      name: 'General'
    })
    const rooms = userService.addRoomToUser({
      user_id: user.id,
      rooms: [room.id]
    })
    return res.status(200).send({ user, rooms })
  }
}

const userController = new UserController()
export { userController }