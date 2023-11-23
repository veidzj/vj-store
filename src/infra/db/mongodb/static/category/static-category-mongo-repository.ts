import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type GetCategoriesRepository } from '@/application/protocols/db/static/category'

export class StaticCategoryMongoRepository implements GetCategoriesRepository {
  public get = async(): Promise<GetCategoriesRepository.Output> => {
    const categoryCollection = MongoHelper.getCollection('categories')
    const categories = await categoryCollection.find().toArray()
    return MongoHelper.mapCollection(categories)
  }
}
