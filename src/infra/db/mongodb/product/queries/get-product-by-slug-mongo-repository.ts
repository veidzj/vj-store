import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetProductBySlugRepository } from '@/application/protocols/product/queries'
import { type ProductRepositoryOutput } from '@/application/dtos/product'

export class GetProductBySlugMongoRepository implements GetProductBySlugRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getBySlug(slug: string): Promise<ProductRepositoryOutput> {
    const productCollection = this.mongoHelper.getCollection('products')
    const product = await productCollection.findOne({
      slug
    }, {
      projection: {
        _id: 0,
        updatedAt: 0
      }
    })
    return product && this.mongoHelper.map<ProductRepositoryOutput>(product)
  }
}
