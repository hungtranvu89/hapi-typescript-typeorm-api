import { ServerRoute } from 'hapi'

import { withController } from '../../utils'
import {
  ITaskController,
  ITaskRouteOptions,
  TaskControllerCreator
} from './tasks.controller'

import TaskRoutesCreator from './tasks.route'

export default withController<
  ServerRoute[],
  ITaskRouteOptions,
  ITaskController
>(TaskControllerCreator)(TaskRoutesCreator)
