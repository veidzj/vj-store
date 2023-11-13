import bcrypt from 'bcrypt'
import { throwError } from '@/tests/domain/mocks'
import { BcryptAdapter } from '@/infra/cryptography'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return digest
  },

  async compare(): Promise<boolean> {
    return true
  }
}))

const salt: number = 12
const plainText: string = 'plain_text'
const digest: string = 'digest'

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash', () => {
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

    test('Should return a hashed value if hash succeeds', async() => {
      const sut = makeSut()
      const hashedValue = await sut.hash(plainText)
      expect(hashedValue).toBe(digest)
    })
  })

  describe('compare', () => {
    test('Should call compare with correct values', async() => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'compare')
      await sut.compare(plainText, digest)
      expect(hashSpy).toHaveBeenCalledWith(plainText, digest)
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

    test('Should return true if compare succeeds', async() => {
      const sut = makeSut()
      const isMatch = await sut.compare(plainText, digest)
      expect(isMatch).toBe(true)
    })
  })
})
