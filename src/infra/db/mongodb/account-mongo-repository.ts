import { type CheckAccountByEmailRepository } from '@/application/protocols/db/check-account-by-email-repository'
import { type AddAccountRepository } from '@/application/protocols/db/add-account-repository'
import { type GetAccountByEmailRepository } from '@/application/protocols/db/get-account-by-email-repository'
import { type AddAccount } from '@/domain/usecases/add-account'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

export class AccountMongoRepository implements CheckAccountByEmailRepository, AddAccountRepository, GetAccountByEmailRepository {
  public checkByEmail = async(email: string): Promise<boolean> => {
    const accountCollection = MongoHelper.getCollection('account')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return account !== null
  }

  public add = async(input: AddAccount.Input): Promise<boolean> => {
    const accountCollection = MongoHelper.getCollection('account')
    const result = await accountCollection.insertOne(input)
    return result.insertedId !== null
  }

  public getByEmail = async(email: string): Promise<GetAccountByEmailRepository.Output | null> => {
    const accountCollection = MongoHelper.getCollection('account')
    const account = await accountCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return account && MongoHelper.map(account)
  }
}
