import { throwError } from '@/tests/test-helper'
import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { HashComparerSpy, EncrypterSpy } from '@/tests/application/mocks/cryptography'
import { UpdateAccessTokenRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbAuthentication } from '@/application/usecases/account/authentication'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepository: UpdateAccessTokenRepositorySpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepository = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepository)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepository
  }
}

describe('DbAuthentication', () => {
  describe('GetAccountByEmailRepository', () => {
    test('Should call GetAccountByEmailRepository with correct email', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(getAccountByEmailRepositorySpy.email).toBe(authenticationInput.email)
    })

    test('Should throw AccountNotFoundError if GetAccountByEmailRepository returns null', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      getAccountByEmailRepositorySpy.output = null
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(getAccountByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('HashComparer', () => {
    test('Should call HashComparer with correct values', async() => {
      const { sut, hashComparerSpy, getAccountByEmailRepositorySpy } = makeSut()
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(hashComparerSpy.plainText).toBe(authenticationInput.password)
      expect(hashComparerSpy.digest).toBe(getAccountByEmailRepositorySpy.output?.password)
    })

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.isMatch = false
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })

    test('Should throw if HashComparer throws', async() => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('Encrypter', () => {
    test('Should call Encrypter with correct id', async() => {
      const { sut, encrypterSpy, getAccountByEmailRepositorySpy } = makeSut()
      await sut.auth(mockAuthenticationInput())
      expect(encrypterSpy.plainText).toBe(getAccountByEmailRepositorySpy.output?.id)
    })

    test('Should throw if Encrypter throws', async() => {
      const { sut, encrypterSpy } = makeSut()
      jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('UpdateAccessTokenRepository', () => {
    test('Should call UpdateAccessTokenRepository with correct values', async() => {
      const { sut, updateAccessTokenRepository, getAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
      await sut.auth(mockAuthenticationInput())
      expect(updateAccessTokenRepository.input).toEqual({
        id: getAccountByEmailRepositorySpy.output?.id,
        accessToken: encrypterSpy.cipherText
      })
    })

    test('Should throw if UpdateAccessTokenRepository throws', async() => {
      const { sut, updateAccessTokenRepository } = makeSut()
      jest.spyOn(updateAccessTokenRepository, 'updateAccessToken').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return an accessToken on success', async() => {
      const { sut, encrypterSpy } = makeSut()
      const accessToken = await sut.auth(mockAuthenticationInput())
      expect(accessToken).toBe(encrypterSpy.cipherText)
    })
  })
})
