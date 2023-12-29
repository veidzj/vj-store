import { MongoHelper } from '@/infra/db/mongodb'
import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'
import { type Account } from '@/domain/entities/account'

export class GetAccountByEmailMongoRepository implements GetAccountByEmailRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getByEmail(email: string): Promise<Account | null> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 0
      }
    })
    return account && account as unknown as Account
  }
}
