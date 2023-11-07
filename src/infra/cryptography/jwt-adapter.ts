import jwt from 'jsonwebtoken'
import { type Encrypter, type Decrypter } from '@/application/protocols/cryptography'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  public encrypt = async(plainText: string): Promise<string> => {
    const token = jwt.sign({ id: plainText }, this.secret)
    return token
  }

  public decrypt = async(cipherText: string): Promise<string> => {
    const decodedToken = jwt.verify(cipherText, this.secret)
    return decodedToken as string
  }
}
