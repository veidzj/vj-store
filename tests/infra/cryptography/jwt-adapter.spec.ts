import jwt from 'jsonwebtoken'
import { throwError } from '@/tests/domain/mocks'
import { JwtAdapter } from '@/infra/cryptography'

const jwtSecret: string = 'secret'
const jwtToken: string = 'jwt_token'
const jwtDecodedToken: string = 'jwt_decoded_token'
const plainText: string = 'plain_text'

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return jwtToken
  },

  verify(): string {
    return jwtDecodedToken
  }
}))

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(jwtSecret)
}

describe('JwtAdapter', () => {
  describe('sign', () => {
    test('Should call sign with correct values', async() => {
      const sut = makeSut()
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(plainText)
      expect(signSpy).toHaveBeenLastCalledWith({ id: plainText }, jwtSecret)
    })

    test('Should throw if sign throws', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt(plainText)
      await expect(promise).rejects.toThrow()
    })

    test('Should return a token on success', async() => {
      const sut = makeSut()
      const token = await sut.encrypt(plainText)
      expect(token).toBe(jwtToken)
    })
  })

  describe('verify', () => {
    test('Should call verify with correct values', async() => {
      const sut = makeSut()
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(jwtToken)
      expect(verifySpy).toHaveBeenLastCalledWith(jwtToken, jwtSecret)
    })

    test('Should throw if verify throws', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt(jwtToken)
      await expect(promise).rejects.toThrow()
    })

    test('Should return a decoded token on success', async() => {
      const sut = makeSut()
      const decodedToken = await sut.decrypt(jwtToken)
      expect(decodedToken).toBe(jwtDecodedToken)
    })
  })
})
