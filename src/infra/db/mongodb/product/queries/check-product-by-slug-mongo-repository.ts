import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckProductBySlugRepository } from '@/application/protocols/product/queries'

export class CheckProductBySlugMongoRepository implements CheckProductBySlugRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async checkBySlug(slug: string): Promise<boolean> {
    const productCollection = this.mongoHelper.getCollection('products')
    const count = await productCollection.countDocuments({ slug })
    return count > 0
  }
}
