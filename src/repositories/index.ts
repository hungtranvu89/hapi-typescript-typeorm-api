import { Connection } from 'typeorm'

import taskRepository, { ITaskRepository } from './task.repository'
import userRepository, { IUserRepository } from './user.repository'

interface IRepository extends IUserRepository, ITaskRepository {}

const createRepository = ({
  connection
}: {
  connection: Connection
}): IRepository => ({
  ...userRepository({ connection }),
  ...taskRepository({ connection })
})

export { IUserRepository, ITaskRepository, createRepository, IRepository }
