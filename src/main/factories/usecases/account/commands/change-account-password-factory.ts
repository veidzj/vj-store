import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'
import { DbChangeAccountPassword } from '@/application/usecases/account/commands'
import { GetAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { ChangeAccountPasswordMongoRepository } from '@/infra/db/mongodb/account/commands'
import { BcryptAdapter } from '@/infra/cryptography'

export class ChangeAccountPasswordFactory {
  public static readonly makeChangeAccountPassword = (): ChangeAccountPassword => {
    const salt = 12
    const getAccountByEmailRepository = new GetAccountByEmailMongoRepository()
    const hashComparer = new BcryptAdapter(salt)
    const hasher = new BcryptAdapter(salt)
    const changeAccountPasswordRepository = new ChangeAccountPasswordMongoRepository()
    return new DbChangeAccountPassword(getAccountByEmailRepository, hashComparer, hasher, changeAccountPasswordRepository)
  }
}
