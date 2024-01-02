import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetAccountIdByTokenRepository } from '@/application/protocols/account/queries'

export class GetAccountIdByTokenMongoRepository implements GetAccountIdByTokenRepository {
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
        id: 1
      }
    })
    return account && account?.id
  }
}
