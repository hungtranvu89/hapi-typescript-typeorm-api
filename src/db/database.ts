import 'reflect-metadata'
import { createConnection } from 'typeorm'

import { getTypeormOptions } from '../configs'

import TaskEntity from './entities/task.entity'
import UserEntity from './entities/user.entity'

const connectDatabase = async () => {
  const connectionOptions = await getTypeormOptions()

  return createConnection({
    ...connectionOptions,
    entities: [UserEntity, TaskEntity],
    synchronize: true,
    logging: false
  })
}

export { connectDatabase, UserEntity, TaskEntity }
