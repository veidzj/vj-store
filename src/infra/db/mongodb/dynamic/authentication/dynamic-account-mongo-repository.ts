import { type AddAccountRepository } from '@/application/protocols/db/dynamic/authentication/add-account-repository'
import { type AddAccount } from '@/domain/usecases/authentication/add-account'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

export class DynamicAccountMongoRepository implements AddAccountRepository {
  public add = async(input: AddAccount.Input): Promise<boolean> => {
    const accountCollection = MongoHelper.getCollection('account')
    const result = await accountCollection.insertOne(input)
    return result.insertedId !== null
  }
}
