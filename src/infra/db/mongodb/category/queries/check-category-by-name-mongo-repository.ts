import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type CheckCategoryByNameRepository } from '@/application/protocols/category/queries'

export class CheckCategoryByNameMongoRepository implements CheckCategoryByNameRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async checkByName(name: string): Promise<boolean> {
    const categoryCollection = this.mongoHelper.getCollection('categories')
    const count = await categoryCollection.countDocuments({
      name: {
        $regex: `^${name}$`,
        $options: 'i'
      }
    })
    return count > 0
  }
}
