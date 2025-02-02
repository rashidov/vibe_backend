import { uid } from "uid";

type User = {
  id: string
  login: string
  socket_id: string | null
}

class UsersEntity {
  users: Map<string, User>

  constructor() {
    this.users = new Map()
  }

  getUser(id: string) {
    return this.users.get(id)
  }

  addUser(login: string) {
    const id = uid(4)
    this.users.set(id, { id, login, socket_id: null })
    return this.getUser(id)
  }

  removeUser(id: string) {
    if (!this.users.has(id)) return false
    this.users.delete(id)
    return true
  }

  addUsersSocketId(candidate: Omit<User, 'login'>) {
    if (!this.users.has(candidate.id)) return
    this.users.set(candidate.id, { ...this.users.get(candidate.id)!, socket_id: candidate.socket_id })
    return this.getUser(candidate.id)
  }

  removeUsersSocketId(id: string) {
    if (!this.users.has(id)) return false
    this.users.set(id, {...this.users.get(id)!, socket_id: null})
    return true
  }
}

export default UsersEntity