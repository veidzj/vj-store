import { MongoHelper } from '@/infra/db/mongodb'
import { type AddAccountRepository } from '@/application/protocols/account/commands'
import { type Account } from '@/domain/entities/account'

export class AddAccountMongoRepository implements AddAccountRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async add(account: Account): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.insertOne(account)
  }
}
