import { throwError } from '@/tests/test-helper'
import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { HashComparerSpy, EncrypterSpy } from '@/tests/application/mocks/cryptography'
import { UpdateAccessTokenRepositorySpy } from '@/tests/application/mocks/account/commands'
import { DbAuthentication } from '@/application/usecases/account'
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
    const { sut, getAccountByEmailRepositorySpy } = makeSut()

    test('Should call GetAccountByEmailRepository with correct email', async() => {
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(getAccountByEmailRepositorySpy.email).toBe(authenticationInput.email)
    })

    test('Should throw AccountNotFoundError if GetAccountByEmailRepository returns null', async() => {
      getAccountByEmailRepositorySpy.output = null
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      jest.spyOn(getAccountByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('HashComparer', () => {
    const { sut, hashComparerSpy, getAccountByEmailRepositorySpy } = makeSut()

    test('Should call HashComparer with correct values', async() => {
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(hashComparerSpy.plainText).toBe(authenticationInput.password)
      expect(hashComparerSpy.digest).toBe(getAccountByEmailRepositorySpy.output?.password)
    })

    test('Should throw if HashComparer throws', async() => {
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      hashComparerSpy.isMatch = false
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
  })

  describe('Encrypter', () => {
    const { sut, encrypterSpy, getAccountByEmailRepositorySpy } = makeSut()

    test('Should call Encrypter with correct id', async() => {
      await sut.auth(mockAuthenticationInput())
      expect(encrypterSpy.plainText).toBe(getAccountByEmailRepositorySpy.output?.id)
    })

    test('Should throw if Encrypter throws', async() => {
      jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('UpdateAccessTokenRepository', () => {
    const { sut, updateAccessTokenRepository, getAccountByEmailRepositorySpy, encrypterSpy } = makeSut()

    test('Should call UpdateAccessTokenRepository with correct values', async() => {
      await sut.auth(mockAuthenticationInput())
      expect(updateAccessTokenRepository.input).toEqual({
        id: getAccountByEmailRepositorySpy.output?.id,
        accessToken: encrypterSpy.cipherText
      })
    })

    test('Should throw if UpdateAccessTokenRepository throws', async() => {
      jest.spyOn(updateAccessTokenRepository, 'updateAccessToken').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return an accessToken on success', async() => {
      const accessToken = await sut.auth(mockAuthenticationInput())
      expect(accessToken).toBe(encrypterSpy.cipherText)
    })
  })
})
