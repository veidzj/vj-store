import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type GetProductByIdRepository } from '@/application/protocols/db/static/product'

export class StaticProductMongoRepository implements GetProductByIdRepository {
  public getById = async(id: string): Promise<GetProductByIdRepository.Output | null> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ _id: new ObjectId(id) })
    if (!product) {
      return null
    }
    return MongoHelper.map(product)
  }
}
