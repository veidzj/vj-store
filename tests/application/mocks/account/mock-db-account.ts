import { type CheckAccountByEmailRepository, type AddAccountRepository } from '@/application/protocols/account'
import { type Account } from '@/domain/entities/account'

export class CheckAccountByEmailRepositorySpy implements CheckAccountByEmailRepository {
  public email: string

  public async checkByEmail(email: string): Promise<boolean> {
    this.email = email
    return false
  }
}

export class AddAccountRepositorySpy implements AddAccountRepository {
  public account: Account

  public async add(account: Account): Promise<void> {
    this.account = account
  }
}
