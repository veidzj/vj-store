import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type AddProductRepository, type UpdateProductRepository } from '@/application/protocols/db/dynamic/product'

export class DynamicProductMongoRepository implements AddProductRepository, UpdateProductRepository {
  public add = async(input: AddProductRepository.Input): Promise<void> => {
    const productCollection = MongoHelper.getCollection('products')
    await productCollection.insertOne(input)
  }

  public update = async(input: UpdateProductRepository.Input): Promise<void> => {
    const productCollection = MongoHelper.getCollection('products')
    await productCollection.updateOne({
      _id: new ObjectId(input.id)
    }, {
      $set: input
    })
  }
}
