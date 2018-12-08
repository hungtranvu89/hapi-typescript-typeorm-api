import * as joi from 'joi'
import { ConnectionOptions, getConnectionOptions } from 'typeorm'

const configsSchema = joi.object().keys({
  PORT: joi.number().required(),
  HOST: joi.string().required(),
  JWT_SECRET: joi.string().required(),
  JWT_EXP: joi.number().required(),
  LOG: joi.boolean().optional()
})

const PORT = Number(process.env.PORT)
const HOST = String(process.env.HOST)
const JWT_SECRET = String(process.env.JWT_SECRET)
const JWT_EXP = Number(process.env.JWT_EXP)
const LOG = Boolean(process.env.LOG)

try {
  joi.assert({ PORT, HOST, JWT_SECRET, JWT_EXP, LOG }, configsSchema)
} catch (e) {
  console.error('Configuration error:', e.message)
  process.exit(1)
}

let typeOrmOptions: ConnectionOptions

const getTypeormOptions = async () => {
  if (!typeOrmOptions) typeOrmOptions = await getConnectionOptions()

  return typeOrmOptions
}

export { PORT, HOST, JWT_SECRET, JWT_EXP, LOG, getTypeormOptions }
