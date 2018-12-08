import { path } from 'rambda'

export const getCredentialId = path<number>(['auth', 'credentials', 'id'])
