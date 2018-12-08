import { Plugin, ResponseToolkit } from 'hapi'
import * as hapiJwt from 'hapi-auth-jwt2'
import { path } from 'rambda'

import { JWT_SECRET } from '../configs'
import constants from '../constants'
import { IUserRepository } from '../repositories'
import { ControllerCreator, IPluginCreator, withController } from '../utils'

interface IOptions {
  repository: IUserRepository
}

interface IController {
  validateDecodedUser(
    decoded: object,
    request: Request,
    h: ResponseToolkit
  ): Promise<{
    isValid: boolean
  }>
}

const getDecodedId = path<string>(['id'])

const controllerCreator: ControllerCreator<IOptions, IController> = {
  validateDecodedUser: ({ repository: { checkUserById } }) => async (
    decoded,
    request,
    h
  ) => {
    const isValid = await checkUserById(getDecodedId(decoded))

    return { isValid }
  }
}

const plugin: IPluginCreator<hapiJwt, { controller: IController }> = ({
  controller
}) => ({
  once: true,
  name: 'my jwt',
  version: '0.1',
  register: async server => {
    await server.register(hapiJwt)
    server.auth.strategy(constants.AUTH_STRATEGIES.JWT, 'jwt', {
      key: JWT_SECRET,
      validate: controller.validateDecodedUser,
      verifyOptions: {
        algorithms: ['HS256']
      }
    })

    server.auth.default(constants.AUTH_STRATEGIES.JWT) // TODO: env
  }
})

export default withController<Plugin<hapiJwt>, IOptions, IController>(
  controllerCreator
)(plugin)
