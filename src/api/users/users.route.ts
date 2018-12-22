import constants from '../../constants'
import { ISwaggerConfiguration } from '../../plugins/swagger.plugin'
import tags from '../../tags'
import { buildRoutes, IRouteCreator } from '../../utils'
import Routes from '../Routes'

import { IUserController } from './users.controller'
import {
  createUserSchema,
  loginUserSchema,
  updateUserSchema
} from './users.validator'

interface IOptions {
  controller: IUserController
}

const UserRoutesCreator: IRouteCreator<IOptions> = ({ controller }) =>
  buildRoutes({
    [Routes.users._]: {
      POST: {
        handler: controller.createUser,
        auth: false,
        tags: [tags.API, tags.USERS],
        description: 'Create a user.',
        validate: createUserSchema,
        plugins: {
          'hapi-swagger': {
            responses: {
              '201': {
                description: 'User created.'
              }
            }
          }
        } as ISwaggerConfiguration
      },
      DELETE: {
        handler: controller.deleteUser,
        auth: constants.AUTH_STRATEGIES.JWT,
        tags: [tags.API, tags.USERS],
        description: 'Delete current user.',
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'User deleted.'
              },
              '401': {
                description: 'User does not have authorization.'
              }
            }
          }
        } as ISwaggerConfiguration
      },
      PUT: {
        handler: controller.updateUser,
        auth: constants.AUTH_STRATEGIES.JWT,
        tags: [tags.API, tags.USERS],
        description: 'Update current user info.',
        validate: updateUserSchema,
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'Updated info.'
              },
              '401': {
                description: 'User does not have authorization.'
              }
            }
          }
        } as ISwaggerConfiguration
      }
    },
    [Routes.users.info]: {
      GET: {
        handler: controller.getUser,
        auth: constants.AUTH_STRATEGIES.JWT,
        tags: [tags.API, tags.USERS],
        description: 'Get user info.',
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'User founded.'
              },
              '401': {
                description: 'Please login.'
              }
            }
          }
        } as ISwaggerConfiguration
      }
    },
    [Routes.users.login]: {
      POST: {
        handler: controller.loginUser,
        auth: false,
        tags: [tags.API, tags.USERS],
        description: 'Login a user.',
        validate: loginUserSchema,
        plugins: {
          'hapi-swagger': {
            responses: {
              '200': {
                description: 'User logged in.'
              }
            }
          }
        } as ISwaggerConfiguration
      }
    }
  })

export default UserRoutesCreator
