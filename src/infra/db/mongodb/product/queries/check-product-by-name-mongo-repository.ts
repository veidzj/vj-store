import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckProductByNameRepository } from '@/application/protocols/product/queries'

export class CheckProductByNameMongoRepository implements CheckProductByNameRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async checkByName(name: string): Promise<boolean> {
    const productCollection = this.mongoHelper.getCollection('products')
    const count = await productCollection.countDocuments({ name })
    return count > 0
  }
}
