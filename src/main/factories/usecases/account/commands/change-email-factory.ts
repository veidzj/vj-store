import { type ChangeEmail } from '@/domain/usecases/account/commands'
import { DbChangeEmail } from '@/application/usecases/account/commands'
import { CheckAccountByEmailMongoRepository } from '@/infra/db/mongodb/account/queries'
import { ChangeEmailMongoRepository } from '@/infra/db/mongodb/account/commands'

export class ChangeEmailFactory {
  public static readonly makeChangeEmail = (): ChangeEmail => {
    const checkAccountByEmailRepository = new CheckAccountByEmailMongoRepository()
    const changeEmailRepository = new ChangeEmailMongoRepository()
    return new DbChangeEmail(checkAccountByEmailRepository, changeEmailRepository)
  }
}
