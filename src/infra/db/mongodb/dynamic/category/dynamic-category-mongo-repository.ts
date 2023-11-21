import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type AddCategoryRepository } from '@/application/protocols/db/dynamic/category'

export class DynamicCategoryMongoRepository implements AddCategoryRepository {
  public add = async(input: AddCategoryRepository.Input): Promise<void> => {
    const categoryCollection = MongoHelper.getCollection('categories')
    await categoryCollection.insertOne(input)
  }
}
