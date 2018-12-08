import { badImplementation, badRequest, unauthorized } from 'boom'
import { Request, ResponseObject, ResponseToolkit } from 'hapi'
import { pick } from 'rambda'

import { IUser } from '../../models'
import { IUserRepository } from '../../repositories'
import { ControllerCreator, generateToken, getCredentialId } from '../../utils'

import {
  ICreateUserRequest,
  ILoginUserRequest,
  IUpdateUserRequest
} from './users.validator'

interface IUserController {
  getUser(request: Request, h: ResponseToolkit): Promise<Partial<IUser>>
  createUser(
    request: ICreateUserRequest,
    h: ResponseToolkit
  ): Promise<ResponseObject>
  loginUser(
    request: ILoginUserRequest,
    h: ResponseToolkit
  ): Promise<{ token: string }>
  deleteUser(request: Request, h: ResponseToolkit): Promise<Partial<IUser>>
  updateUser(
    request: IUpdateUserRequest,
    h: ResponseToolkit
  ): Promise<Partial<IUser>>
}

interface IUserRouteOptions {
  repository: IUserRepository
}

const getUserInfo = pick('id,name,email')
const getOwnInfo = pick('id,name,email,createdAt,updatedAt')

const generateUserToken = (user: IUser) => {
  const payload = getUserInfo(user)

  return generateToken(payload)
}

const UserControllerCreator: ControllerCreator<
  IUserRouteOptions,
  IUserController
> = {
  getUser: ({ repository: { findUserById } }) => (request, h) => {
    const id = getCredentialId(request)
    if (!id) throw badRequest()

    return findUserById(id).then(getOwnInfo)
  },
  createUser: ({ repository: { createUser } }) => async (request, h) => {
    try {
      const user = await createUser(request.payload).then(getUserInfo)

      return h.response(user).code(201)
    } catch (error) {
      throw badImplementation('Create user', error)
    }
  },
  loginUser: ({ repository: { findUserByEmail } }) => async (request, h) => {
    const { email, password } = request.payload

    const user = await findUserByEmail(email)

    if (!user) {
      throw unauthorized('User or Password is invalid.')
    }

    if (!user.validatePassword(password)) {
      throw unauthorized('User or Password is invalid.')
    }

    return { token: generateUserToken(user) }
  },
  updateUser: ({ repository: { updateUser } }) => async (request, h) => {
    const id = getCredentialId(request)
    if (!id) throw badRequest()

    try {
      return await updateUser(id, request.payload).then(getUserInfo)
    } catch (error) {
      throw badImplementation('Update user', error)
    }
  },
  deleteUser: ({ repository: { deleteUser } }) => async (request, h) => {
    const id = getCredentialId(request)
    if (!id) throw badRequest()

    return deleteUser(id).then(getUserInfo)
  }
}

export { IUserController, IUserRouteOptions, UserControllerCreator }
