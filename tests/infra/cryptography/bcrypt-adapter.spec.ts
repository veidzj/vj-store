import bcrypt from 'bcrypt'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { BcryptAdapter } from '@/infra/cryptography'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return digest
  },

  async compare(): Promise<boolean> {
    return true
  }
}))

let salt: number
let plainText: string
let digest: string

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  beforeEach(() => {
    salt = faker.number.int({ min: 10, max: 12 })
    plainText = faker.word.words()
    digest = faker.word.words()
  })

  describe('Hasher', () => {
    test('Should call hash with correct values', async() => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash(plainText)
      expect(hashSpy).toHaveBeenCalledWith(plainText, salt)
    })

    test('Should throw if hash throws', async() => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash(plainText)
      await expect(promise).rejects.toThrow()
    })

    test('Should return a hashed value on success', async() => {
      const sut = makeSut()
      const hashedValue = await sut.hash(plainText)
      expect(hashedValue).toBe(digest)
    })
  })

  describe('HashComparer', () => {
    test('Should call compare with correct values', async() => {
      const sut = makeSut()
      const compareSy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(plainText, digest)
      expect(compareSy).toHaveBeenCalledWith(plainText, digest)
    })

    test('Should throw if compare throws', async() => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(throwError)
      const promise = sut.compare(plainText, digest)
      await expect(promise).rejects.toThrow()
    })

    test('Should return false if compare returns false', async() => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'compare').mockImplementationOnce(() => false)
      const isMatch = await sut.compare(plainText, digest)
      expect(isMatch).toBe(false)
    })

    test('Should return true on success', async() => {
      const sut = makeSut()
      const isMatch = await sut.compare(plainText, digest)
      expect(isMatch).toBe(true)
    })
  })
})
