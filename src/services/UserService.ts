import { userRepository } from '../entities/Users'
import { userChannelsRepository } from '../entities/UserChannels'
import { userRoomsRepository } from '../entities/UserRooms'
import { User, UserRoomRelation } from '../types/user'
import { roomService } from './RoomService'

class UserService {
  createUser(login: string) {
    const user = userRepository.add(login)
    const room = roomService.createRoom({
      maintainer: user.id,
      name: 'General',
    })
    const rooms = userService.addRoomToUser({
      user_id: user.id,
      rooms: [room.id],
    })
    return { user, rooms }
  }

  addSocketIdToUser(candidate: Omit<User, 'login'>) {
    return userRepository.addUsersSocketId(candidate)
  }

  removeSocketIdInUser(id: string) {
    return userRepository.removeUsersSocketId(id)
  }

  addRoomToUser(payload: UserRoomRelation) {
    return userRoomsRepository.addUser(payload)
  }

  getAllUsers() {
    return userRepository.getAll()
  }

  remove(id: string) {
    return userRepository.remove(id)
  }
}

export const userService = new UserService()
