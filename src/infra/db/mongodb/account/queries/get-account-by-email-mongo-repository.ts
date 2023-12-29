import { MongoHelper } from '@/infra/db/mongodb'
import { type GetAccountByEmailRepository } from '@/application/protocols/account/queries'

export class GetAccountByEmailMongoRepository implements GetAccountByEmailRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getByEmail(email: string): Promise<GetAccountByEmailRepository.Output | null> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 0,
        id: 1,
        password: 1
      }
    })
    return account && account as unknown as GetAccountByEmailRepository.Output
  }
}
