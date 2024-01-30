import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetProductsWithDiscountRepository } from '@/application/protocols/product/queries'
import { type ProductsRepositoryOutput } from '@/application/protocols/product/common'

export class GetProductsWithDiscountMongoRepository implements GetProductsWithDiscountRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getWithDiscount(page: number, limit: number): Promise<ProductsRepositoryOutput> {
    const productCollection = this.mongoHelper.getCollection('products')
    const skip = (page - 1) * limit
    const productsDocument = await productCollection
      .find({
        discountPercentage: {
          $gt: 0
        }
      }, {
        projection: {
          _id: 0,
          updatedAt: 0
        }
      }
      )
      .sort({ discountPercentage: -1 })
      .skip(skip)
      .limit(limit)
      .toArray()
    const totalItems = await productCollection.countDocuments({ discountPercentage: { $gt: 0 } })
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))
    return {
      products: this.mongoHelper.mapCollection(productsDocument),
      currentPage: page,
      totalPages,
      totalItems
    }
  }
}
