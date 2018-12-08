import { Server } from 'hapi'

import { jwtAuth, log, swagger } from '../plugins'
import { IRepository } from '../repositories'
import { LOG } from '../configs'

interface IOptions {
  server: Server
  repository: IRepository
}

export default ({ server, repository }: IOptions) => {
  const plugins = [swagger(), jwtAuth({ repository })]
  if (LOG) plugins.push(log())

  return server.register(plugins)
}
