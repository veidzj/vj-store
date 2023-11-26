import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type GetAllProductsRepository, type GetProductByIdRepository } from '@/application/protocols/db/static/product'

export class StaticProductMongoRepository implements GetAllProductsRepository, GetProductByIdRepository {
  public getAll = async(page: number = 1, limit: number = 25): Promise<GetAllProductsRepository.Output> => {
    const productCollection = MongoHelper.getCollection('products')
    const skip = (page - 1) * limit
    const products = await productCollection
      .find()
      .skip(skip)
      .limit(limit)
      .toArray()
    return MongoHelper.mapCollection(products)
  }

  public getById = async(id: string): Promise<GetProductByIdRepository.Output | null> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ _id: new ObjectId(id) })
    if (!product) {
      return null
    }
    return MongoHelper.map(product)
  }
}
