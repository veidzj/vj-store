import { mockAuthenticationInput } from '../../domain/mocks/mock-account'
import { GetAccountByEmailRepositorySpy } from '../mocks/mock-db-account'
import { DbAuthentication } from '../../../src/application/usecases/db-authentication'
import { throwError } from '../../domain/mocks/test-helper'
import { HashComparerSpy } from '../mocks/mock-cryptography'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy
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
})
