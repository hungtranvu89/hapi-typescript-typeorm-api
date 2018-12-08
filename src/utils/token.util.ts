import { sign } from 'jsonwebtoken'
import { JWT_EXP, JWT_SECRET } from '../configs'

const generateToken = (payload: object) => {
  return sign(payload, JWT_SECRET, { expiresIn: JWT_EXP })
}

export { generateToken }
