import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type ChangeAccountEmailRepository } from '@/application/protocols/account/commands'

export class ChangeAccountEmailMongoRepository implements ChangeAccountEmailRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async changeEmail(curentEmail: string, newEmail: string): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      email: curentEmail
    }, {
      $set: {
        email: newEmail
      }
    })
  }
}
