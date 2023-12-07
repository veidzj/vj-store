import { faker } from '@faker-js/faker'

import { type Hasher, type HashComparer, type Encrypter, type Decrypter } from '@/application/protocols/cryptography'

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
  public isMatch: boolean = true

  public compare = async(plainText: string, digest: string): Promise<boolean> => {
    this.plainText = plainText
    this.digest = digest
    return this.isMatch
  }
}

export class EncrypterSpy implements Encrypter {
  public plainText: string
  public cipherText: string = faker.string.uuid()

  public encrypt = async(plainText: string): Promise<string> => {
    this.plainText = plainText
    return this.cipherText
  }
}

export class DecrypterSpy implements Decrypter {
  public plainText: string = faker.internet.password()
  public cipherText: string

  public decrypt = async(cipherText: string): Promise<string> => {
    this.cipherText = cipherText
    return this.plainText
  }
}
