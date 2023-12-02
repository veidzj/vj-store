import { faker } from '@faker-js/faker'
import { DecrypterSpy, GetAccountByTokenRepositorySpy } from '@/tests/application/mocks'
import { throwError } from '@/tests/domain/mocks'
import { DbGetAccountByToken } from '@/application/usecases/static/auth'
import { AccessDeniedError, InvalidTokenError } from '@/application/errors/auth'

let token: string
let role: string

interface Sut {
  sut: DbGetAccountByToken
  decrypterSpy: DecrypterSpy
  getAccountByTokenRepositorySpy: GetAccountByTokenRepositorySpy
}

const makeSut = (): Sut => {
  const decrypterSpy = new DecrypterSpy()
  const getAccountByTokenRepositorySpy = new GetAccountByTokenRepositorySpy()
  const sut = new DbGetAccountByToken(decrypterSpy, getAccountByTokenRepositorySpy)
  return {
    sut,
    decrypterSpy,
    getAccountByTokenRepositorySpy
  }
}

describe('DbGetAccountByToken', () => {
  beforeEach(() => {
    token = faker.string.uuid()
    role = faker.word.words()
  })

  describe('Decrypter', () => {
    test('Should call Decrypter with correct cipher text', async() => {
      const { sut, decrypterSpy } = makeSut()
      await sut.getByToken(token, role)
      expect(decrypterSpy.cipherText).toBe(token)
    })

    test('Should throw InvalidTokenError if Decrypter throws', async() => {
      const { sut, decrypterSpy } = makeSut()
      jest.spyOn(decrypterSpy, 'decrypt').mockImplementationOnce(throwError)
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow(new InvalidTokenError())
    })
  })

  describe('GetAccountByTokenRepository', () => {
    test('Should call GetAccountByTokenRepository with correct values', async() => {
      const { sut, getAccountByTokenRepositorySpy } = makeSut()
      await sut.getByToken(token, role)
      expect(getAccountByTokenRepositorySpy.token).toBe(token)
      expect(getAccountByTokenRepositorySpy.role).toBe(role)
    })

    test('Should throw if GetAccountByTokenRepository throws', async() => {
      const { sut, getAccountByTokenRepositorySpy } = makeSut()
      jest.spyOn(getAccountByTokenRepositorySpy, 'getByToken').mockImplementationOnce(throwError)
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow()
    })

    test('Should throw AccessDeniedError if GetAccountByTokenRepository returns null', async() => {
      const { sut, getAccountByTokenRepositorySpy } = makeSut()
      getAccountByTokenRepositorySpy.account = null
      const promise = sut.getByToken(token, role)
      await expect(promise).rejects.toThrow(new AccessDeniedError())
    })

    test('Should return an account on success', async() => {
      const { sut, getAccountByTokenRepositorySpy } = makeSut()
      const account = await sut.getByToken(token, role)
      expect(account).toBe(getAccountByTokenRepositorySpy.account)
    })
  })
})
