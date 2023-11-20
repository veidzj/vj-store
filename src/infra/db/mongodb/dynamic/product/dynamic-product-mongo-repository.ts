import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type AddProductRepository } from '@/application/protocols/db/dynamic/product'

export class DynamicProductMongoRepository implements AddProductRepository {
  public add = async(input: AddProductRepository.Input): Promise<void> => {
    const productCollection = MongoHelper.getCollection('products')
    await productCollection.insertOne(input)
  }
}
