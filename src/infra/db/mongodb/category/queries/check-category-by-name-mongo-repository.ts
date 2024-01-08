import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'

export class CheckCategoryByNameMongoRepository implements CheckCategoryByNameRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async checkByName(name: string): Promise<boolean> {
    const accountCollection = this.mongoHelper.getCollection('categories')
    const count = await accountCollection.countDocuments({ name })
    return count > 0
  }
}
