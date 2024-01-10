import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type GetAllCategoriesRepository } from '@/application/protocols/category/queries'

export class GetAllCategoriesMongoRepository implements GetAllCategoriesRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async getAll(): Promise<GetAllCategoriesRepository.Output[]> {
    const categoryCollection = this.mongoHelper.getCollection('categories')
    const categories = await categoryCollection.find().toArray()
    const mappedCategories = categories.map((category) => ({
      id: category?.id,
      name: category?.name
    }))
    return mappedCategories
  }
}
