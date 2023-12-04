import { type AddAccount } from '@/domain/usecases/dynamic/auth'
import { DbAddAccount } from '@/application/usecases/dynamic/auth'
import { BcryptAdapter } from '@/infra/cryptography'
import { StaticAccountMongoRepository } from '@/infra/db/mongodb/static/auth'
import { DynamicAccountMongoRepository } from '@/infra/db/mongodb/dynamic/auth'

export class AddAccountFactory {
  public static makeAddAccount = (): AddAccount => {
    const salt = 12
    const staticAccountMongoRepository = new StaticAccountMongoRepository()
    const dynamicAccountMongoRepository = new DynamicAccountMongoRepository()
    const bcryptAdapter = new BcryptAdapter(salt)
    return new DbAddAccount(staticAccountMongoRepository, bcryptAdapter, dynamicAccountMongoRepository)
  }
}
