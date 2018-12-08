import { compareSync, genSaltSync, hashSync } from 'bcryptjs'

const createHash = (term: string) => {
  if (!term) {
    throw new Error('Give me food!')
  }

  return hashSync(term, genSaltSync(8))
}

const compareToHash = (term: string, hash: string) => compareSync(term, hash)

export { createHash, compareToHash }
