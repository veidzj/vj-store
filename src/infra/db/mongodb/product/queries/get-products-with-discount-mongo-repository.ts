import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetProductsWithDiscountRepository } from '@/application/protocols/product/queries'

export class GetProductsWithDiscountMongoRepository implements GetProductsWithDiscountRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getWithDiscount(page: number, limit: number): Promise<GetProductsWithDiscountRepository.Output> {
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
    const totalItems = await productCollection.countDocuments()
    const totalPages = Math.ceil(totalItems / limit)
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
      totalPages,
      totalItems
    }
  }
}
