import { type ChangeAccountEmail } from '@/domain/usecases/account/commands'
import { DbChangeAccountEmail } from '@/application/usecases/account/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { ChangeAccountEmailMongoRepository } from '@/infra/db/mongodb/account/commands'

export class ChangeAccountEmailFactory {
  public static readonly makeChangeAccountEmail = (): ChangeAccountEmail => {
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const changeEmailRepository = new ChangeAccountEmailMongoRepository()
    return new DbChangeAccountEmail(checkAccountByEmailRepository, changeEmailRepository)
  }
}
