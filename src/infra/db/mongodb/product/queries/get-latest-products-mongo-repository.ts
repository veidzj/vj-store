import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetLatestProductsRepository } from '@/application/protocols/product/queries'
import { type ProductsRepositoryOutput } from '@/application/dtos/product'

export class GetLatestProductsMongoRepository implements GetLatestProductsRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getLatest(page: number, limit: number): Promise<ProductsRepositoryOutput> {
    const productCollection = this.mongoHelper.getCollection('products')
    const skip = (page - 1) * limit
    const productsDocument = await productCollection
      .find({}, {
        projection: {
          _id: 0,
          updatedAt: 0
        }
      }
      )
      .sort({ createdAt: 'desc' })
      .skip(skip)
      .limit(limit)
      .toArray()
    const totalItems = await productCollection.countDocuments()
    const totalPages = Math.ceil(totalItems / limit)
    return {
      products: this.mongoHelper.mapCollection(productsDocument),
      currentPage: page,
      totalPages,
      totalItems
    }
  }
}
