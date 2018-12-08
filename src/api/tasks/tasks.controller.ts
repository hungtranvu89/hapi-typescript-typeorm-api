import { badImplementation, badRequest, notFound } from 'boom'
import { ResponseObject, ResponseToolkit } from 'hapi'

import { IPageOf, ITask } from '../../models'
import { ITaskRepository } from '../../repositories'
import { ControllerCreator, getCredentialId } from '../../utils'

import {
  ICreateTaskRequest,
  IGetTaskByIdRequest,
  IGetTasksRequest,
  IPatchTaskRequest
} from './tasks.validator'

interface ITaskController {
  createTask(
    request: ICreateTaskRequest,
    h: ResponseToolkit
  ): Promise<ResponseObject>
  getTasks(
    request: IGetTasksRequest,
    h: ResponseToolkit
  ): Promise<IPageOf<ITask>>
  getTaskById(request: IGetTaskByIdRequest, h: ResponseToolkit): Promise<ITask>
  patchTask(request: IPatchTaskRequest, h: ResponseToolkit): Promise<ITask>
  deleteTask(request: IGetTaskByIdRequest, h: ResponseToolkit): Promise<ITask>
}

interface ITaskRouteOptions {
  repository: ITaskRepository
}

const TaskControllerCreator: ControllerCreator<
  ITaskRouteOptions,
  ITaskController
> = {
  createTask: ({ repository: { createUserTask } }) => async (request, h) => {
    const userId = getCredentialId(request)
    if (!userId) throw badRequest()

    try {
      const task = await createUserTask(userId, request.payload)

      return h.response(task).code(201)
    } catch (error) {
      throw badImplementation(error)
    }
  },
  getTasks: ({ repository: { findUserTasks } }) => (request, h) => {
    const userId = getCredentialId(request)
    if (!userId) throw badRequest()

    return findUserTasks(userId, {
      top: Number(request.query.top || 5),
      skip: Number(request.query.skip || 0)
    })
  },
  getTaskById: ({ repository: { findUserTaskById } }) => async (request, h) => {
    const userId = getCredentialId(request)
    if (!userId) throw badRequest()
    const task = await findUserTaskById(userId, request.params.id)
    if (!task) throw notFound()

    return task
  },
  patchTask: ({ repository: { updateUserTask } }) => async (request, h) => {
    const userId = getCredentialId(request)
    if (!userId) throw badRequest()
    const task = await updateUserTask(
      userId,
      request.params.id,
      request.payload
    )
    if (!task) throw notFound()

    return task
  },
  deleteTask: ({ repository: { deleteUserTask } }) => async (request, h) => {
    const userId = getCredentialId(request)
    if (!userId) throw badRequest()
    const task = await deleteUserTask(userId, request.params.id)
    if (!task) throw notFound()

    return task
  }
}

export { ITaskController, TaskControllerCreator, ITaskRouteOptions }
