import jwt from 'jsonwebtoken'
import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { JwtAdapter } from '@/infra/cryptography'

jest.mock('jsonwebtoken', () => ({
  sign(): string {
    return jwtToken
  },

  verify(): string {
    return jwtDecodedToken
  }
}))

const jwtSecret: string = faker.string.uuid()
const plainText: string = faker.string.uuid()
const jwtToken: string = faker.string.uuid()
const jwtDecodedToken: string = faker.string.uuid()

const makeSut = (): JwtAdapter => {
  return new JwtAdapter(jwtSecret)
}

describe('JwtAdapter', () => {
  describe('Encrypter', () => {
    const sut = makeSut()

    test('Should call sign with correct values', async() => {
      const signSpy = jest.spyOn(jwt, 'sign')
      await sut.encrypt(plainText)
      expect(signSpy).toHaveBeenCalledWith({ id: plainText }, jwtSecret, { expiresIn: '1h' })
    })

    test('Should throw if sign throws', async() => {
      jest.spyOn(jwt, 'sign').mockImplementationOnce(throwError)
      const promise = sut.encrypt(plainText)
      await expect(promise).rejects.toThrow()
    })

    test('Should return an accessToken on success', async() => {
      const accessToken = await sut.encrypt(plainText)
      expect(accessToken).toBe(jwtToken)
    })
  })

  describe('Decrypter', () => {
    const sut = makeSut()

    test('Should call verify with correct values', async() => {
      const verifySpy = jest.spyOn(jwt, 'verify')
      await sut.decrypt(jwtToken)
      expect(verifySpy).toHaveBeenCalledWith(jwtToken, jwtSecret)
    })

    test('Should throw if verify throws', async() => {
      const sut = makeSut()
      jest.spyOn(jwt, 'verify').mockImplementationOnce(throwError)
      const promise = sut.decrypt(jwtToken)
      await expect(promise).rejects.toThrow()
    })
  })
})
