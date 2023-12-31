import bcrypt from 'bcrypt'

import { type Hasher, type HashComparer } from '@/application/protocols/cryptography'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  public async hash(plainText: string): Promise<string> {
    const hashedValue = await bcrypt.hash(plainText, this.salt)
    return hashedValue
  }

  public async compare(plainText: string, digest: string): Promise<boolean> {
    const isMatch = await bcrypt.compare(plainText, digest)
    return isMatch
  }
}
