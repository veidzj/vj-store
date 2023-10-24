import bcrypt from 'bcrypt'
import { BcryptAdapter } from '../../../src/infra/cryptography/bcrypt-adapter'
import { throwError } from '../../domain/mocks/test-helper'

jest.mock('bcrypt', () => ({
  async hash(): Promise<string> {
    return 'hashed_value'
  }
}))

const salt = 12

const makeSut = (): BcryptAdapter => {
  return new BcryptAdapter(salt)
}

describe('BcryptAdapter', () => {
  describe('hash', () => {
    test('Should call hash with correct values', async() => {
      const sut = makeSut()
      const hashSpy = jest.spyOn(bcrypt, 'hash')
      await sut.hash('any_value')
      expect(hashSpy).toHaveBeenCalledWith('any_value', salt)
    })

    test('Should throw if hash throws', async() => {
      const sut = makeSut()
      jest.spyOn(bcrypt, 'hash').mockImplementationOnce(throwError)
      const promise = sut.hash('any_value')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a hashed value if hash succeeds', async() => {
      const sut = makeSut()
      const hashedValue = await sut.hash('any_value')
      expect(hashedValue).toBe('hashed_value')
    })
  })
})
