import { Connection } from 'typeorm'

import { TaskEntity } from '../db'
import { ETaskStatus, IPageOf, IPagingOptions, ITask } from '../models'

export interface ITaskRepository {
  findUserTasks(
    userId: number,
    options: IPagingOptions
  ): Promise<IPageOf<ITask>>
  findUserTaskById(userId: number, id: number): Promise<ITask>
  createUserTask(
    userId: number,
    newInfo: {
      name: string
      description: string
    }
  ): Promise<ITask>
  updateUserTask(
    userId: number,
    id: number,
    newInfo: {
      name?: string
      description?: string
      status?: ETaskStatus
    }
  ): Promise<ITask>
  deleteUserTask(userId: number, id: number): Promise<ITask>
}

interface IOptions {
  connection: Connection
}

export default ({ connection }: IOptions): ITaskRepository => {
  const taskRepository = connection.getRepository(TaskEntity)

  return {
    findUserTasks: async (userId, options) => {
      const [data, total] = await taskRepository.findAndCount({
        where: { userId },
        skip: options.skip,
        take: options.top
      })

      return {
        total,
        data
      }
    },
    findUserTaskById: (userId, id) =>
      taskRepository.findOne(id, { where: { userId } }),
    createUserTask: (userId, newInfo) => {
      const newTask = taskRepository.create({
        ...newInfo,
        userId,
        status: ETaskStatus.TODO
      })

      return taskRepository.save(newTask)
    },
    updateUserTask: async (userId, id, newInfo) => {
      const wouldUpdate = await taskRepository.preload({
        userId,
        id,
        ...newInfo
      })

      return taskRepository.save(wouldUpdate)
    },
    deleteUserTask: async (userId, id) => {
      const old = await taskRepository.findOne(id, {
        where: { userId }
      })

      await taskRepository.delete(id)

      return old
    }
  }
}
