import { MongoHelper } from '@/infra/db/mongodb/mongo-helper'
import { type CheckCategoryByNameRepository, type GetAllCategoriesRepository } from '@/application/protocols/db/static/category'

export class StaticCategoryMongoRepository implements CheckCategoryByNameRepository, GetAllCategoriesRepository {
  public checkByName = async(name: string): Promise<boolean> => {
    const categoryCollection = MongoHelper.getCollection('categories')
    const category = await categoryCollection.findOne({
      name: {
        $regex: `^${name}$`,
        $options: 'i'
      }
    })
    return category !== null
  }

  public getAll = async(): Promise<GetAllCategoriesRepository.Output> => {
    const categoryCollection = MongoHelper.getCollection('categories')
    const categories = await categoryCollection
      .find({}, {
        projection: {
          name: 1
        }
      })
      .toArray()
    return MongoHelper.mapCollection(categories)
  }
}
