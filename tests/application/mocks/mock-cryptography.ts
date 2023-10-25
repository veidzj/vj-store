import { faker } from '@faker-js/faker'
import { type Hasher } from '../../../src/application/protocols/cryptography/hasher'
import { type HashComparer } from '../../../src/application/protocols/cryptography/hash-comparer'

export class HasherSpy implements Hasher {
  public plainText: string
  public digest: string = faker.string.uuid()

  public hash = async(plainText: string): Promise<string> => {
    this.plainText = plainText
    return this.digest
  }
}

export class HashComparerSpy implements HashComparer {
  public plainText: string
  public digest: string
  public isValid: boolean = true

  public compare = async(plainText: string, digest: string): Promise<boolean> => {
    this.plainText = plainText
    this.digest = digest
    return this.isValid
  }
}
