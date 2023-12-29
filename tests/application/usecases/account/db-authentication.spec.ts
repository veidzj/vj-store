import { mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { DbAuthentication } from '@/application/usecases/account'
import { GetAccountByEmailRepositorySpy } from '@/tests/application/mocks/account/queries'

interface Sut {
  sut: DbAuthentication
  getAccountByEmailRepositorySpy: GetAccountByEmailRepositorySpy
}

const makeSut = (): Sut => {
  const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
  const sut = new DbAuthentication(getAccountByEmailRepositorySpy)
  return {
    sut,
    getAccountByEmailRepositorySpy
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
  })
})
