import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetProductsByCategoryRepository } from '@/application/protocols/product/queries'

export class GetProductsByCategoryMongoRepository implements GetProductsByCategoryRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getByCategory(category: string, page: number, limit: number): Promise<GetProductsByCategoryRepository.Output> {
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
          _id: 0,
          updatedAt: 0
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
