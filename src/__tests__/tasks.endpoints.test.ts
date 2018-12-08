import { pick } from 'rambda'
import { Connection } from 'typeorm'
import { Server } from 'hapi'

import { PORT, HOST, getTypeormOptions } from '../configs'
import { createServer } from '../server'
import { connectDatabase } from '../db'
import { createRepository } from '../repositories'
import { generateToken } from '../utils'
import { prepareMockDb, clearMockDb } from '../../tests/utils'

describe('TASKS endpoint', () => {
  const baseUrl = `${HOST}:${PORT}`
  const dbName = 'test_task'
  const options = prepareMockDb(dbName)

  let connection: Connection
  let server: Server
  let headers: {}
  const taskUser = {
    email: 'taskdemo@mail.com',
    name: 'taskUser',
    password: 'taskUser',
    id: 0
  }

  const task = {
    name: 'task',
    description: 'new task',
    id: 0
  }

  beforeAll(async () => {
    getTypeormOptions.mockReturnValueOnce(options)

    connection = await connectDatabase()
    const repository = createRepository({ connection })

    server = await createServer({ repository })

    const newUser = await repository.createUser(
      pick(['email', 'name', 'password'])(taskUser)
    )
    taskUser.id = newUser.id

    const token = generateToken({
      id: taskUser.id,
      email: 'taskdemo@mail.com',
      name: 'taskUser'
    })

    headers = {
      authorization: `bearer ${token}`
    }
  })

  afterAll(async () => {
    await connection.close()
    await clearMockDb(dbName)
  })

  describe('POST /tasks', () => {
    test('should create new task', async () => {
      const res = await server.inject({
        method: 'POST',
        url: `${baseUrl}/tasks`,
        payload: pick(['name', 'description'])(task),
        headers
      })

      expect(res.result.id).toBeGreaterThan(0)
      task.id = res.result.id
    })
  })

  describe('GET /tasks', () => {
    test('should return task list of current user', async () => {
      const res = await server.inject({
        method: 'GET',
        url: `${baseUrl}/tasks`,
        headers
      })

      expect(res.result.data.length).toBeGreaterThan(0)
    })
  })

  describe('GET /tasks/{id}', () => {
    test('should return task list of current user', async () => {
      const res = await server.inject({
        method: 'GET',
        url: `${baseUrl}/tasks/${task.id}`,
        headers
      })

      expect(res.result.name).toEqual('task')
    })
  })
})
