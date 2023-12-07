import { ObjectId } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type CheckProductByIdRepository, type GetProductsByCategoryRepository, type GetProductBySlugRepository, type GetProductsWithDiscountRepository, type GetLatestProductsRepository } from '@/application/protocols/db/static/product'

export class StaticProductMongoRepository implements
  CheckProductByIdRepository,
  GetProductsByCategoryRepository,
  GetProductBySlugRepository,
  GetProductsWithDiscountRepository,
  GetLatestProductsRepository {
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
      case 'discount':
        sortCriteria = { discountPercentage: 'desc' }
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
    }, {
      projection: {
        updatedAt: 0
      }
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

  public getLatest = async(page: number = 1, limit: number = 25): Promise<GetLatestProductsRepository.Output> => {
    const productCollection = MongoHelper.getCollection('products')
    const skip = (page - 1) * limit
    const products = await productCollection
      .find({}, {
        projection: {
          updatedAt: 0
        }
      }
      )
      .sort({ addedAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .toArray()
    return MongoHelper.mapCollection(products)
  }
}
