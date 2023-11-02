import { DbAuthentication } from '@/application/usecases/authentication/db-authentication'
import { GetAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy } from '@/tests/application/mocks/mock-db-authentication'
import { EncrypterSpy, HashComparerSpy } from '@/tests/application/mocks/mock-cryptography'
import { mockAuthenticationInput } from '@/tests/domain/mocks/mock-account'
import { throwError } from '@/tests/domain/mocks/test-helper'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
  updateAccessTokenRepositorySpy: UpdateAccessTokenRepositorySpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const updateAccessTokenRepositorySpy = new UpdateAccessTokenRepositorySpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy, updateAccessTokenRepositorySpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy,
    updateAccessTokenRepositorySpy
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

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(getAccountByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if GetAccountByEmailRepository returns null', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      getAccountByEmailRepositorySpy.output = null
      const authenticationModel = await sut.auth(mockAuthenticationInput())
      expect(authenticationModel).toBeNull()
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

    test('Should throw if HashComparer throws', async() => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return null if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.isValid = false
      const authenticationInput = mockAuthenticationInput()
      const authenticationModel = await sut.auth(authenticationInput)
      expect(authenticationModel).toBeNull()
    })
  })

  describe('Encrypter', () => {
    test('Should call Encrypter with correct value (id)', async() => {
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
      const { sut, encrypterSpy, getAccountByEmailRepositorySpy, updateAccessTokenRepositorySpy } = makeSut()
      await sut.auth(mockAuthenticationInput())
      expect(updateAccessTokenRepositorySpy.input.id).toBe(getAccountByEmailRepositorySpy.output?.id)
      expect(updateAccessTokenRepositorySpy.input.token).toBe(encrypterSpy.cipherText)
    })

    test('Should return an username and access token on success', async() => {
      const { sut, getAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
      const authenticationModel = await sut.auth(mockAuthenticationInput())
      expect(authenticationModel?.username).toBe(getAccountByEmailRepositorySpy.output?.username)
      expect(authenticationModel?.accessToken).toBe(encrypterSpy.cipherText)
    })
  })
})
