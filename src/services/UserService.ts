import { userRepository } from '../entities/Users'
import { userChannelsRepository } from '../entities/UserChannels'
import { userRoomsRepository } from '../entities/UserRooms'
import { UserRoomRelation } from '../types/user'

class UserService {
  create(login: string) {
    return userRepository.add(login)
  }

  addRoomToUser(payload: UserRoomRelation) {
    return userRoomsRepository.addUser(payload)
  }

  getAllUsers() {
    return userRepository.getAll()
  }
}

export const userService = new UserService()
