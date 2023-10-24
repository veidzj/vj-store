import bcrypt from 'bcrypt'
import { type Hasher } from '../../application/protocols/cryptography/hasher'

export class BcryptAdapter implements Hasher {
  constructor(private readonly salt: number) {}

  public hash = async(plainText: string): Promise<string> => {
    const hashedValue = await bcrypt.hash(plainText, this.salt)
    return hashedValue
  }
}
