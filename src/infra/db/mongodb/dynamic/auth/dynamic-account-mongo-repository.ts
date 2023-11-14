import { ObjectId } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type AddAccountRepository, type UpdateAccessTokenRepository } from '@/application/protocols/db/dynamic/auth'

export class DynamicAccountMongoRepository implements AddAccountRepository, UpdateAccessTokenRepository {
  public add = async(input: AddAccountRepository.Input): Promise<void> => {
    const accountCollection = MongoHelper.getCollection('accounts')
    await accountCollection.insertOne(input)
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
