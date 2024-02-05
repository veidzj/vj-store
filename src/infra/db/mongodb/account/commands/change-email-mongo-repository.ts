import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type ChangeEmailRepository } from '@/application/protocols/account/commands'

export class ChangeEmailMongoRepository implements ChangeEmailRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async change(curentEmail: string, newEmail: string): Promise<void> {
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
