import { type AddAccount } from '@/domain/usecases/account/commands'
import { DbAddAccount } from '@/application/usecases/account/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { BcryptAdapter } from '@/infra/cryptography'
import { AddAccountMongoRepository } from '@/infra/db/mongodb/account/commands'

export class AddAccountFactory {
  public static makeAddAccount = (): AddAccount => {
    const salt = 12
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const hasher = new BcryptAdapter(salt)
    const addAccountRepository = new AddAccountMongoRepository()
    return new DbAddAccount(checkAccountByEmailRepository, hasher, addAccountRepository)
  }
}
