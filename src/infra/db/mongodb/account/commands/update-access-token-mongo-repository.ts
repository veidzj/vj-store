import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type UpdateAccessTokenRepository } from '@/application/protocols/account/commands'

export class UpdateAccessTokenMongoRepository implements UpdateAccessTokenRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async updateAccessToken(input: UpdateAccessTokenRepository.Input): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      id: input.id
    }, {
      $set: {
        accessToken: input.accessToken
      }
    })
  }
}
