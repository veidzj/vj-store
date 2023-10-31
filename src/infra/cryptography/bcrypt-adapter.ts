import bcrypt from 'bcrypt'
import { type Hasher } from '@/application/protocols/cryptography/hasher'
import { type HashComparer } from '@/application/protocols/cryptography/hash-comparer'

export class BcryptAdapter implements Hasher, HashComparer {
  constructor(private readonly salt: number) {}

  public hash = async(plainText: string): Promise<string> => {
    const hashedValue = await bcrypt.hash(plainText, this.salt)
    return hashedValue
  }

  public compare = async(plainText: string, digest: string): Promise<boolean> => {
    const isValid = await bcrypt.compare(plainText, digest)
    return isValid
  }
}
