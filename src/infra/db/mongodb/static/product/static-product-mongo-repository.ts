import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type CheckProductByIdRepository, type GetAllProductsRepository, type GetProductsByCategoryRepository, type GetProductBySlugRepository } from '@/application/protocols/db/static/product'

export class StaticProductMongoRepository implements CheckProductByIdRepository, GetAllProductsRepository, GetProductsByCategoryRepository, GetProductBySlugRepository {
  public checkById = async(id: string): Promise<boolean> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ _id: new ObjectId(id) })
    return product !== null
  }

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

  public getByCategory = async(category: string): Promise<GetProductsByCategoryRepository.Output> => {
    const productCollection = MongoHelper.getCollection('products')
    const products = await productCollection.find({ category }).toArray()
    return MongoHelper.mapCollection(products)
  }

  public getBySlug = async(slug: string): Promise<GetProductBySlugRepository.Output | null> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({ slug })
    if (!product) {
      return null
    }
    return MongoHelper.map(product)
  }
}
