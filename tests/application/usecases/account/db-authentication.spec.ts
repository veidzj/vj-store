import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { DbAuthentication } from '@/application/usecases/account'
import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'
import { AccountNotFoundError, InvalidCredentialsError } from '@/domain/errors/account'
import { HashComparerSpy, EncrypterSpy } from '@/tests/application/mocks/cryptography'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
  hashComparerSpy: HashComparerSpy
  encrypterSpy: EncrypterSpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const hashComparerSpy = new HashComparerSpy()
  const encrypterSpy = new EncrypterSpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy, hashComparerSpy, encrypterSpy)
  return {
    sut,
    getAccountByEmailRepositorySpy,
    hashComparerSpy,
    encrypterSpy
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
      getAccountByEmailRepositorySpy.account = null
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new AccountNotFoundError())
    })

    test('Should throw if GetAccountByEmailRepository throws', async() => {
      const { sut, getAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(getAccountByEmailRepositorySpy, 'getByEmail').mockImplementationOnce(() => { throw new Error() })
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
      expect(hashComparerSpy.digest).toBe(getAccountByEmailRepositorySpy.account?.getPassword())
    })

    test('Should throw if HashComparer throws', async() => {
      const { sut, hashComparerSpy } = makeSut()
      jest.spyOn(hashComparerSpy, 'compare').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw InvalidCredentialsError if HashComparer returns false', async() => {
      const { sut, hashComparerSpy } = makeSut()
      hashComparerSpy.isMatch = false
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow(new InvalidCredentialsError())
    })
  })

  describe('Encrypter', () => {
    test('Should call Encrypter with correct id', async() => {
      const { sut, encrypterSpy, getAccountByEmailRepositorySpy } = makeSut()
      await sut.auth(mockAuthenticationInput())
      expect(encrypterSpy.plainText).toBe(getAccountByEmailRepositorySpy.account?.getId())
    })

    test('Should throw if Encrypter throws', async() => {
      const { sut, encrypterSpy } = makeSut()
      jest.spyOn(encrypterSpy, 'encrypt').mockImplementationOnce(() => { throw new Error() })
      const promise = sut.auth(mockAuthenticationInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
