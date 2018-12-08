import { Server } from 'hapi'

import { HOST, PORT } from '../configs'
import { IRepository } from '../repositories'

import register from './register'
import route from './route'

interface IOptions {
  repository: IRepository
}

// Create a server with a host and port
export const createServer = async ({ repository }: IOptions) => {
  const server = new Server({
    host: HOST,
    port: PORT
  })

  await register({ server, repository })

  await route({ server, repository })

  return server
}
