import { mockAccount } from '@/tests/domain/mocks/account'
import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type Account } from '@/domain/entities/account'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string

  public async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return false
  }
}

export class GetAccountByEmailRepositorySpy implements GetAccountByEmailRepository {
  public email: string
  public account: Account = mockAccount()

  public async getByEmail(email: string): Promise<Account> {
    this.email = email
    return this.account
  }
}
