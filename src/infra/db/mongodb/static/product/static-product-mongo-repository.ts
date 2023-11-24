import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type GetProductByIdRepository } from '@/application/protocols/db/static/product'
import { ObjectId } from 'mongodb'

export class StaticProductMongoRepository implements GetProductByIdRepository {
  public getById = async(id: string): Promise<GetProductByIdRepository.Output | null> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ _id: new ObjectId(id) })
    return MongoHelper.map(product)
  }
}
