import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type GetAllCategoriesRepository } from '@/application/protocols/db/static/category'

export class StaticCategoryMongoRepository implements GetAllCategoriesRepository {
  public getAll = async(): Promise<GetAllCategoriesRepository.Output> => {
    const categoryCollection = MongoHelper.getCollection('categories')
    const categories = await categoryCollection.find().toArray()
    return MongoHelper.mapCollection(categories)
  }
}
