import { type AddAccountRepository } from '@/application/protocols/account/commands'
import { type Account } from '@/domain/entities/account'

export class AddAccountRepositorySpy implements AddAccountRepository {
  public account: Account

  public async add(account: Account): Promise<void> {
    this.account = account
  }
}
