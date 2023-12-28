import bcrypt from 'bcrypt'

import { BcryptAdapter } from '@/infra/cryptography'
import { faker } from '@faker-js/faker'

const salt: number = faker.number.int({ min: 10, max: 12 })
const plainText: string = faker.word.words()
const digest: string = faker.word.words()

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return digest
  }
}))

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  test('Should call hash with correct values', async() => {
    const sut = makeSut()
    const hashSpy = jest.spyOn(bcrypt, 'hash')
    await sut.hash(plainText)
    expect(hashSpy).toHaveBeenCalledWith(plainText, salt)
  })

  test('Should throw if hash throws', async() => {
    const sut = makeSut()
    jest.spyOn(bcrypt, 'hash').mockImplementationOnce(() => { throw new Error() })
    const promise = sut.hash(plainText)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a hashed value on success', async() => {
    const sut = makeSut()
    const hashedValue = await sut.hash(plainText)
    expect(hashedValue).toBe(digest)
  })
})
