import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetLatestProductsRepository } from '@/application/protocols/product/queries'

export class GetLatestProductsMongoRepository implements GetLatestProductsRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getLatest(page: number, limit: number): Promise<GetLatestProductsRepository.Output> {
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
    return {
      products: productsDocument.map((product) => ({
        id: product?.id,
        name: product?.name,
        description: product?.description,
        price: product?.price,
        discountPercentage: product?.discountPercentage,
        quantity: product?.quantity,
        category: product?.category,
        slug: product?.slug,
        imagesUrls: product?.imagesUrls,
        createdAt: product?.createdAt
      })),
      currentPage: page,
      totalPages: page,
      totalItems: page
    }
  }
}
