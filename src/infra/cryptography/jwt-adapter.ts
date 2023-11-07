import jwt from 'jsonwebtoken'
import { type Encrypter, type Decrypter } from '@/application/protocols/cryptography'
import { InvalidTokenError, TokenExpiredError } from '@/application/errors'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  public encrypt = async(plainText: string): Promise<string> => {
    const token = jwt.sign({ id: plainText }, this.secret)
    return token
  }

  public decrypt = async(cipherText: string): Promise<string> => {
    try {
      const decodedToken = jwt.verify(cipherText, this.secret)
      return decodedToken as string
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        throw new TokenExpiredError()
      } else {
        throw new InvalidTokenError()
      }
    }
  }
}
