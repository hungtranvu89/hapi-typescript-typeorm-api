import { Server } from 'hapi'

import { LOG } from '../configs'
import { jwtAuth, log, swagger } from '../plugins'
import { IRepository } from '../repositories'

interface IOptions {
  server: Server
  repository: IRepository
}

export default ({ server, repository }: IOptions) => {
  const plugins = [swagger(), jwtAuth({ repository })]

  if (LOG) plugins.push(log())

  return server.register(plugins)
}
