import { type AddAccount } from '@/domain/usecases/add-account'
import { DbAddAccount } from '@/application/usecases/db-add-account'
import { BcryptAdapter } from '@/infra/cryptography/bcrypt-adapter'
import { AccountMongoRepository } from '@/infra/db/mongodb/account-mongo-repository'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const accountMongoRepository = new AccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(accountMongoRepository, bcryptAdapter, accountMongoRepository)
}
