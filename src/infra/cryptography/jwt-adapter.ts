import jwt from 'jsonwebtoken'
import { type Encrypter } from '../../application/protocols/cryptography/encrypter'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  public encrypt = async(plainText: string): Promise<string> => {
    const token = jwt.sign({ id: plainText }, this.secret)
    return token
  }
}
