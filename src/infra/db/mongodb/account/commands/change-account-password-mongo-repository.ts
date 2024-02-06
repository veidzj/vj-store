import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type ChangeAccountPasswordRepository } from '@/application/protocols/account/commands'

export class ChangeAccountPasswordMongoRepository implements ChangeAccountPasswordRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async changePassword(accountEmail: string, newPassword: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      email: accountEmail
    }, {
      $set: {
        password: newPassword
      }
    })
  }
}
