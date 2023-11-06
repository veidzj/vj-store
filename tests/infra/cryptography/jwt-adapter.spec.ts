import jwt from 'jsonwebtoken'
import { JwtAdapter } from '@/infra/cryptography'
import { throwError } from '@/tests/domain/mocks'

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return 'any_token'
  },

  async verify(): Promise<string> {
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
  })
})
