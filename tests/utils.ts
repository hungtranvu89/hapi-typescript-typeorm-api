import { Database } from 'sqlite3'
import { unlinkSync } from 'fs'
import { ConnectionOptions } from 'typeorm'

const testDbPath = './tests/'

interface IOnTestDB {
  [k: string]: Database
}

const onTestDb: IOnTestDB = {}

export const prepareMockDb = (name: string) => {
  const path = testDbPath + name + '.db'
  onTestDb[name] = new Database(path)

  return {
    type: 'sqlite',
    database: path
  } as ConnectionOptions
}

export const clearMockDb = async (name: string) => {
  const path = testDbPath + name + '.db'
  onTestDb[name].close()
  delete onTestDb[name]
  unlinkSync(path)
}
