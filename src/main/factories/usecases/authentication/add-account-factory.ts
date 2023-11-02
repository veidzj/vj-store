import { type AddAccount } from '@/domain/usecases/authentication'
import { DbAddAccount } from '@/application/usecases/authentication'
import { BcryptAdapter } from '@/infra/cryptography'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/authentication'
import { DynamicAccountMongoRepository } from '@/infra/db/mongodb/dynamic/authentication'

export const makeDbAddAccount = (): AddAccount => {
  const salt = 12
  const staticAccountMongoRepository = new StaticAccountMongoRepository()
  const dynamicAccountMongoRepository = new DynamicAccountMongoRepository()
  const bcryptAdapter = new BcryptAdapter(salt)
  return new DbAddAccount(staticAccountMongoRepository, bcryptAdapter, dynamicAccountMongoRepository)
}
