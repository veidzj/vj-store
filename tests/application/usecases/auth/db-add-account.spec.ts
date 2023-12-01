import { HasherSpy, CheckAccountByEmailRepositorySpy, AddAccountRepositorySpy } from '@/tests/application/mocks'
import { mockAddAccountInput, throwError } from '@/tests/domain/mocks'
import { DbAddAccount } from '@/application/usecases/auth'
import { EmailInUseError } from '@/application/errors/auth'

interface Sut {
  sut: DbAddAccount
  checkAccountByEmailRepositorySpy: CheckAccountByEmailRepositorySpy
  hasherSpy: HasherSpy
  addAccountRepositorySpy: AddAccountRepositorySpy
}

const makeSut = (): Sut => {
  const checkAccountByEmailRepositorySpy = new CheckAccountByEmailRepositorySpy()
  const hasherSpy = new HasherSpy()
  const addAccountRepositorySpy = new AddAccountRepositorySpy()
  const sut = new DbAddAccount(checkAccountByEmailRepositorySpy, hasherSpy, addAccountRepositorySpy)
  return {
    sut,
    checkAccountByEmailRepositorySpy,
    hasherSpy,
    addAccountRepositorySpy
  }
}

describe('DbAddAccount', () => {
  describe('CheckAccountByEmailRepository', () => {
    test('Should call CheckAccountByEmailRepository with correct email', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(checkAccountByEmailRepositorySpy.email).toEqual(addAccountInput.email)
    })

    test('Should throw if CheckAccountByEmailRepository throws', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      jest.spyOn(checkAccountByEmailRepositorySpy, 'checkByEmail').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw EmailInUseError if CheckAccountByEmailRepository returns true', async() => {
      const { sut, checkAccountByEmailRepositorySpy } = makeSut()
      checkAccountByEmailRepositorySpy.output = true
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow(new EmailInUseError())
    })
  })

  describe('Hasher', () => {
    test('Should call Hasher with correct value', async() => {
      const { sut, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(hasherSpy.plainText).toEqual(addAccountInput.password)
    })

    test('Should throw if Hasher throws', async() => {
      const { sut, hasherSpy } = makeSut()
      jest.spyOn(hasherSpy, 'hash').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddAccountRepository', () => {
    test('Should call AddAccountRepository with correct values', async() => {
      const { sut, addAccountRepositorySpy, hasherSpy } = makeSut()
      const addAccountInput = mockAddAccountInput()
      await sut.add(addAccountInput)
      expect(addAccountRepositorySpy.input).toEqual({ ...addAccountInput, password: hasherSpy.digest })
    })

    test('Should throw if AddAccountRepository throws', async() => {
      const { sut, addAccountRepositorySpy } = makeSut()
      jest.spyOn(addAccountRepositorySpy, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.add(mockAddAccountInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
