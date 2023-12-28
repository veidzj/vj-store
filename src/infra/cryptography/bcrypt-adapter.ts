import bcrypt from 'bcrypt'

import { type Hasher } from '@/application/protocols/cryptography'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  public async hash(plainText: string): Promise<string> {
    const hashedValue = await bcrypt.hash(plainText, this.salt)
    return hashedValue
  }
}
