import { Request } from 'hapi'
import * as Joi from 'joi'
import { ETaskStatus, taskStatusArray } from '../../models'

export const getTaskByIdSchema = {
  params: {
    id: Joi.number().required()
  }
}

export interface IGetTaskByIdRequest extends Request {
  params: {
    id: number
  }
}

export const getTasksSchema = {
  query: {
    top: Joi.number().default(5),
    skip: Joi.number().default(0)
  }
}

export interface IGetTasksRequest extends Request {
  query: {
    top: string
    skip: string
  }
}

export const updateTaskSchema = {
  ...getTaskByIdSchema,
  payload: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required(),
    status: Joi.string()
      .valid(taskStatusArray) // take advantage of enum
      .required()
  })
}

export interface IPatchTaskRequest extends IGetTaskByIdRequest {
  payload: {
    name?: string
    description?: string
    status?: ETaskStatus
  }
}

export const patchTaskSchema = {
  ...getTaskByIdSchema,
  payload: Joi.object().keys({
    name: Joi.string().optional(),
    description: Joi.string().optional(),
    status: Joi.string()
      .valid(taskStatusArray)
      .optional() // take advantage of enum
  })
}

export const createTaskSchema = {
  payload: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().required()
  })
}

export interface ICreateTaskRequest extends IGetTaskByIdRequest {
  payload: {
    name: string
    description: string
  }
}
