import { GetAccountByEmailRepositorySpy, UpdateAccessTokenRepositorySpy, EncrypterSpy, HashComparerSpy } from '@/tests/application/mocks'
import { mockAuthenticationInput, throwError } from '@/tests/domain/mocks'
import { DbAuthentication } from '@/application/usecases/auth/db-authentication'
import { AccountNotFoundError, InvalidCredentialsError } from '@/application/errors/auth'

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

    test('Should throw AccountNotFoundError if GetAccountByEmailRepository returns null', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      getAccountByEmailRepositorySpy.output = null
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
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

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.isMatch = false
      const authenticationInput = mockAuthenticationInput()
      const promise = sut.auth(authenticationInput)
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
  })

  describe('Encrypter', () => {
    test('Should call Encrypter with correct value', async() => {
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

    test('Should throw if UpdateAccessTokenRepository throws', async() => {
      const { sut, updateAccessTokenRepositorySpy } = makeSut()
      jest.spyOn(updateAccessTokenRepositorySpy, 'updateAccessToken').mockImplementationOnce(throwError)
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should return an username and access token on success', async() => {
      const { sut, getAccountByEmailRepositorySpy, encrypterSpy } = makeSut()
      const authenticationModel = await sut.auth(mockAuthenticationInput())
      expect(authenticationModel?.username).toBe(getAccountByEmailRepositorySpy.output?.username)
      expect(authenticationModel?.accessToken).toBe(encrypterSpy.cipherText)
    })
  })
})
