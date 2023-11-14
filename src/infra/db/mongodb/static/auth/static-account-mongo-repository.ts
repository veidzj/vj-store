import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type CheckAccountByEmailRepository, type GetAccountByEmailRepository, type GetAccountByTokenRepository } from '@/application/protocols/db/static/auth'

export class StaticAccountMongoRepository implements CheckAccountByEmailRepository, GetAccountByEmailRepository, GetAccountByTokenRepository {
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

  public getByToken = async(token: string, role?: string): Promise<GetAccountByTokenRepository.Output | null> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({
      accessToken: token,
      $or: [
        { role },
        { role: 'admin' }
      ]
    }, {
      projection: { _id: 1 }
    })
    return account && MongoHelper.map(account)
  }
}
