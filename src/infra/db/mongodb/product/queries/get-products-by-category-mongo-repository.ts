import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'
import { type ProductsRepositoryOutput } from '@/application/dtos/product'

export class GetProductsByCategoryMongoRepository implements GetProductsByCategoryRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getByCategory(category: string, page: number, limit: number): Promise<ProductsRepositoryOutput> {
    const productCollection = this.mongoHelper.getCollection('products')
    const skip = (page - 1) * limit
    const productsDocument = await productCollection
      .find({
        category: {
          $regex: `^${category}$`,
          $options: 'i'
        }
      }, {
        projection: {
          _id: 0
        }
      }
      )
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .toArray()
    const totalItems = await productCollection.countDocuments({
      category: {
        $regex: `^${category}$`,
        $options: 'i'
      }
    })
    const totalPages = Math.max(1, Math.ceil(totalItems / limit))
    return {
      products: this.mongoHelper.mapCollection(productsDocument),
      currentPage: page,
      totalPages,
      totalItems
    }
  }
}
