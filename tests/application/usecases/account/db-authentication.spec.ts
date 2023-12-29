import { mockAccount, mockAuthenticationInput } from '@/tests/domain/mocks/account'
import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { DbAuthentication } from '@/application/usecases/account'
import { type Account } from '@/domain/entities/account'

describe('DbAuthentication', () => {
  describe('GetAccountByEmailRepository', () => {
    test('Should call GetAccountByEmailRepository with correct email', async() => {
      class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
        public email: string
        public account: Account = mockAccount()

        public async getByEmail(email: string): Promise<Account> {
          this.email = email
          return this.account
        }
      }
      const getAccountByEmailRepositorySpy = new GetAccountByEmailRepositorySpy()
      const sut = new DbAuthentication(getAccountByEmailRepositorySpy)
      const authenticationInput = mockAuthenticationInput()
      await sut.auth(authenticationInput)
      expect(getAccountByEmailRepositorySpy.email).toBe(authenticationInput.email)
    })
  })
})
