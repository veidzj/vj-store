import jwt from 'jsonwebtoken'
import { throwError } from '@/tests/domain/mocks'
import { JwtAdapter } from '@/infra/cryptography'
import { ExpiredTokenError, InvalidTokenError } from '@/application/errors/auth'

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token'
  },

  verify(): string {
    return 'any_value'
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter('secret')
}

describe('JwtAdapter', () => {
  describe('sign', () => {
    test('Should call sign with correct values', async() => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt('any_id')
      expect(signSpy).toHaveBeenLastCalledWith({ id: 'any_id' }, 'secret')
    })

    test('Should throw if sign throws', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt('any_id')
      await expect(promise).rejects.toThrow()
    })

    test('Should return a token on success', async() => {
      const sut = makeSut()
      const token = await sut.encrypt('any_id')
      expect(token).toBe('any_token')
    })
  })

  describe('verify', () => {
    test('Should call verify with correct values', async() => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt('any_token')
      expect(verifySpy).toHaveBeenLastCalledWith('any_token', 'secret')
    })

    test('Should throw ExpiredTokenError if verify throws TokenExpiredError', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(() => {
        const error = new Error()
        error.name = 'TokenExpiredError'
        throw error
      })
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow(ExpiredTokenError)
    })

    test('Should throw InvalidTokenError if verify throws any error', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt('any_token')
      await expect(promise).rejects.toThrow(InvalidTokenError)
    })

    test('Should return a decoded token on success', async() => {
      const sut = makeSut()
      const decodedToken = await sut.decrypt('any_token')
      expect(decodedToken).toBe('any_value')
    })
  })
})
