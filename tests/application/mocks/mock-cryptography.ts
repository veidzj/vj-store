import { faker } from '@faker-js/faker'
import { type Hasher } from '../../../src/application/protocols/cryptography/hasher'

export class HasherSpy implements Hasher {
  public plainText: string
  public digest: string = faker.string.uuid()

  public hash = async(plainText: string): Promise<string> => {
    this.plainText = plainText
    return this.digest
  }
}
