import { Connection } from 'typeorm'

import { UserEntity } from '../db'
import { IUser } from '../models'

export interface IUserRepository {
  findUserById(id: number): Promise<IUser>
  checkUserById(id: number): Promise<boolean>
  findUserByEmail(email: string): Promise<IUser>
  createUser(newInfo: {
    email: string
    name: string
    password: string
  }): Promise<IUser>
  updateUser(
    id: number,
    newInfo: {
      email?: string
      name?: string
      password?: string
    }
  ): Promise<IUser>
  deleteUser(id: number): Promise<IUser>
}

interface IOptions {
  connection: Connection
}

export default ({ connection }: IOptions): IUserRepository => {
  const userRepository = connection.getRepository(UserEntity)

  return {
    findUserById: id => userRepository.findOne(id),
    checkUserById: id =>
      userRepository.findOne(id, { select: ['id'] }).then(Boolean),
    findUserByEmail: email => userRepository.findOne({ email }),
    createUser: newInfo => {
      const newUser = userRepository.create(newInfo)

      return userRepository.save(newUser)
    },
    updateUser: async (id, newInfo) => {
      const wouldUpdate = await userRepository.preload({
        id,
        ...newInfo
      })

      return userRepository.save(wouldUpdate)
    },
    deleteUser: async id => {
      const old = await userRepository.findOne(id)

      await userRepository.delete(id)

      return old
    }
  }
}
