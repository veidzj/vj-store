import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type CheckProductByIdRepository, type GetProductsByCategoryRepository, type GetProductBySlugRepository, type GetProductsWithDiscountRepository } from '@/application/protocols/db/static/product'

export class StaticProductMongoRepository implements
  CheckProductByIdRepository,
  GetProductsByCategoryRepository,
  GetProductBySlugRepository,
  GetProductsWithDiscountRepository {
  public checkById = async(id: string): Promise<boolean> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({
      _id: new ObjectId(id)
    })
    return product !== null
  }

  public getByCategory = async(category: string, page: number = 1, limit: number = 25, sortBy?: string): Promise<GetProductsByCategoryRepository.Output> => {
    const productCollection = MongoHelper.getCollection('products')
    const skip = (page - 1) * limit

    let sortCriteria = {}
    switch (sortBy) {
      case 'latest':
        sortCriteria = { addedAt: 'desc' }
        break
    }

    const products = await productCollection
      .find({
        category: {
          $regex: `^${category}$`,
          $options: 'i'
        }
      }, {
        projection: {
          updatedAt: 0
        }
      }
      )
      .sort(sortCriteria)
      .skip(skip)
      .limit(limit)
      .toArray()
    return MongoHelper.mapCollection(products)
  }

  public getBySlug = async(slug: string): Promise<GetProductBySlugRepository.Output | null> => {
    const productCollection = MongoHelper.getCollection('products')
    const product = await productCollection.findOne({
      slug
    })
    if (!product) {
      return null
    }
    return MongoHelper.map(product)
  }

  public getWithDiscount = async(page: number = 1, limit: number = 25): Promise<GetProductsWithDiscountRepository.Output> => {
    const productCollection = MongoHelper.getCollection('products')
    const skip = (page - 1) * limit
    const products = await productCollection
      .find({
        discountPercentage: {
          $gt: 0
        }
      }, {
        projection: {
          addedAt: 0,
          updatedAt: 0
        }
      }
      )
      .sort({ discountPercentage: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    return MongoHelper.mapCollection(products)
  }
}
