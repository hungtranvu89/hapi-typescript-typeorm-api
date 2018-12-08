import { ServerRoute } from 'hapi'

import { withController } from '../../utils'
import {
  IUserController,
  IUserRouteOptions,
  UserControllerCreator
} from './users.controller'

import UserRoutesCreator from './users.route'

export default withController<
  ServerRoute[],
  IUserRouteOptions,
  IUserController
>(UserControllerCreator)(UserRoutesCreator)
