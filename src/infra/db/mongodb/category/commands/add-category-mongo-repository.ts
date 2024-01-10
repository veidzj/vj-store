import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type AddCategoryRepository } from '@/application/protocols/category/commands'

export class AddCategoryMongoRepository implements AddCategoryRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async add(input: AddCategoryRepository.Input): Promise<void> {
    const categoryCollection = this.mongoHelper.getCollection('categories')
    await categoryCollection.insertOne(input)
  }
}
