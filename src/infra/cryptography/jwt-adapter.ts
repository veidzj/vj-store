import jwt from 'jsonwebtoken'

import { type Encrypter } from '@/application/protocols/cryptography'

export class JwtAdapter implements Encrypter {
  constructor(private readonly secret: string) {}

  public async encrypt(plainText: string): Promise<string> {
    const accessToken = jwt.sign({ id: plainText }, this.secret, { expiresIn: '1h' })
    return accessToken
  }
}
