import { ObjectId } from 'mongodb'
import { type AddAccountRepository, type UpdateAccessTokenRepository } from '@/application/protocols/db/dynamic/authentication'
import { type AddAccount } from '@/domain/usecases/authentication/add-account'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'

export class DynamicAccountMongoRepository implements AddAccountRepository, UpdateAccessTokenRepository {
  public add = async(input: AddAccount.Input): Promise<boolean> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(input)
    return result.insertedId !== null
  }

  public updateAccessToken = async(input: UpdateAccessTokenRepository.Input): Promise<void> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({
      _id: new ObjectId(input.id)
    }, {
      $set: {
        accessToken: input.token
      }
    })
  }
}
