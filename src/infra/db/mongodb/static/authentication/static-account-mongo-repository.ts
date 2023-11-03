import { type CheckAccountByEmailRepository } from '@/application/protocols/db/static/authentication/check-account-by-email-repository'
import { type GetAccountByEmailRepository } from '@/application/protocols/db/static/authentication/get-account-by-email-repository'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

export class StaticAccountMongoRepository implements CheckAccountByEmailRepository, GetAccountByEmailRepository {
  public checkByEmail = async(email: string): Promise<boolean> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  public getByEmail = async(email: string): Promise<GetAccountByEmailRepository.Output | null> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        username: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
