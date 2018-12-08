import { Server } from 'hapi'

import { TasksRoute, UsersRoute } from '../api'
import { IRepository } from '../repositories'

interface IOptions {
  server: Server
  repository: IRepository
}

export default ({ server, repository }: IOptions) => {
  server.route(UsersRoute({ repository }).concat(TasksRoute({ repository })))
}
