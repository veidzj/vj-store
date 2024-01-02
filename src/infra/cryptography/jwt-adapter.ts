import jwt from 'jsonwebtoken'

import { type Encrypter, type Decrypter } from '@/application/protocols/cryptography'

export class JwtAdapter implements Encrypter, Decrypter {
  constructor(private readonly secret: string) {}

  public async encrypt(plainText: string): Promise<string> {
    const accessToken = jwt.sign({ id: plainText }, this.secret, { expiresIn: '1h' })
    return accessToken
  }

  public async decrypt(cipherText: string): Promise<string> {
    const decodedToken = jwt.verify(cipherText, this.secret)
    return decodedToken as string
  }
}
