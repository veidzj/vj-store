import { type AddAccountRepository } from '../../../application/protocols/db/add-account-repository'
import { type AddAccount } from '../../../domain/usecases/add-account'
import { MongoHelper } from './mongo-helper'

export class AccountMongoRepository implements AddAccountRepository {
  public add = async(input: AddAccount.Input): Promise<boolean> => {
    const accountCollection = MongoHelper.getCollection('account')
    const result = await accountCollection.insertOne(input)
    return result.insertedId !== null
  }
}
