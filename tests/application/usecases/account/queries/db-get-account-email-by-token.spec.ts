import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { DecrypterSpy } from '@/tests/application/mocks/cryptography'
import { GetAccountEmailByTokenRepositorySpy } from '@/tests/application/mocks/account/queries'
import { DbGetAccountEmailByToken } from '@/application/usecases/account/queries'
import { AccessDeniedError, TokenError } from '@/domain/errors/account'

interface Sut {
  sut: DbGetAccountEmailByToken
  decrypterSpy: DecrypterSpy
  getAccountEmailByTokenRepositorySpy: GetAccountEmailByTokenRepositorySpy
}

const makeSut = (): Sut => {
  const decrypterSpy = new DecrypterSpy()
  const getAccountEmailByTokenRepositorySpy = new GetAccountEmailByTokenRepositorySpy()
  const sut = new DbGetAccountEmailByToken(decrypterSpy, getAccountEmailByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    getAccountEmailByTokenRepositorySpy
  }
}

describe('DbGetAccountEmailByToken', () => {
  let token: string
  let role: string

  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.word.words()
  })

  describe('Decrypter', () => {
    test('Should call Decrypter with correct value', async() => {
      const { sut, decrypterSpy } = makeSut()
      await sut.getByToken(token, role)
      expect(decrypterSpy.cipherText).toBe(token)
    })

    test('Should throw TokenError if Decrypter throws', async() => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow(new TokenError())
    })
  })

  describe('GetAccountEmailByTokenRepository', () => {
    test('Should call GetAccountEmailByTokenRepository with correct values', async() => {
      const { sut, getAccountEmailByTokenRepositorySpy } = makeSut()
      await sut.getByToken(token, role)
      expect(getAccountEmailByTokenRepositorySpy.accessToken).toBe(token)
      expect(getAccountEmailByTokenRepositorySpy.role).toBe(role)
    })

    test('Should throw AccessDeniedError if GetAccountEmailByTokenRepository returns null', async() => {
      const { sut, getAccountEmailByTokenRepositorySpy } = makeSut()
      getAccountEmailByTokenRepositorySpy.output = null
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should throw if GetAccountEmailByTokenRepository throws', async() => {
      const { sut, getAccountEmailByTokenRepositorySpy } = makeSut()
      jest.spyOn(getAccountEmailByTokenRepositorySpy, 'getByToken').mockImplementationOnce(throwError)
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow()
    })

    test('Should return an email on success', async() => {
      const { sut, getAccountEmailByTokenRepositorySpy } = makeSut()
      const email = await sut.getByToken(token, role)
      expect(email).toBe(getAccountEmailByTokenRepositorySpy.output)
    })
  })
})
