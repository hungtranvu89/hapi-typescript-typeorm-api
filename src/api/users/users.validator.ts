import { Request } from 'hapi'
import * as Joi from 'joi'

export interface ICreateUserRequest extends Request {
  payload: {
    email: string
    name: string
    password: string
  }
}

export const createUserSchema = {
  payload: Joi.object().keys({
    email: Joi.string()
      .email()
      .trim()
      .required(),
    name: Joi.string().required(),
    password: Joi.string()
      .trim()
      .min(6)
      .required()
  })
}

export interface IUpdateUserRequest extends Request {
  payload: {
    email: string
    name: string
    password: string
  }
}

export const updateUserSchema = {
  payload: Joi.object().keys({
    email: Joi.string()
      .email()
      .trim(),
    name: Joi.string(),
    password: Joi.string()
      .min(6)
      .trim()
  })
}

export interface ILoginUserRequest extends Request {
  payload: {
    email: string
    password: string
  }
}

export const loginUserSchema = {
  payload: Joi.object().keys({
    email: Joi.string()
      .email()
      .required(),
    password: Joi.string()
      .trim()
      .min(6)
      .required()
  })
}
