import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetAccountEmailByTokenRepository } from '@/application/protocols/account/queries'

export class GetAccountEmailByTokenMongoRepository implements GetAccountEmailByTokenRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getByToken(accessToken: string, role: string): Promise<string | null> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 0,
        email: 1
      }
    })
    return account && account?.email
  }
}
