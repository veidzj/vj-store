import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckProductByIdRepository } from '@/application/protocols/product/queries'

export class CheckProductByIdMongoRepository implements CheckProductByIdRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async checkById(id: string): Promise<boolean> {
    const productCollection = this.mongoHelper.getCollection('products')
    const count = await productCollection.countDocuments({ id })
    return count > 0
  }
}
