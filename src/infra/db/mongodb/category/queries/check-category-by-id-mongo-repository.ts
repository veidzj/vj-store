import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckCategoryByIdRepository } from '@/application/protocols/category/queries'

export class CheckCategoryByIdMongoRepository implements CheckCategoryByIdRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async checkById(id: string): Promise<boolean> {
    const categoryCollection = this.mongoHelper.getCollection('categories')
    const count = await categoryCollection.countDocuments({ id })
    return count > 0
  }
}
