import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type UpdateCategoryRepository } from '@/application/protocols/category/commands'

export class UpdateCategoryMongoRepository implements UpdateCategoryRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async update(input: UpdateCategoryRepository.Input): Promise<void> {
    const categoryCollection = this.mongoHelper.getCollection('categories')
    await categoryCollection.updateOne({
      id: input.id
    }, {
      $set: {
        name: input.name,
        updatedAt: input.updatedAt
      }
    })
  }
}
