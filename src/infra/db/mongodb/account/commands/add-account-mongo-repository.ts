import { MongoHelper } from '@/infra/db/mongodb'
import { type AddAccountRepository } from '@/application/protocols/account/commands'

export class AddAccountMongoRepository implements AddAccountRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async add(input: AddAccountRepository.Input): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.insertOne(input)
  }
}
