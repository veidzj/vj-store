import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type AddCategoryRepository } from '@/application/protocols/category/commands'

export class AddCategoryMongoRepository implements AddCategoryRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async add(input: AddCategoryRepository.Input): Promise<void> {
    const accountCollection = this.mongoHelper.getCollection('categories')
    await accountCollection.insertOne(input)
  }
}
