import { type Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers'

const mongoHelper: MongoHelper = MongoHelper.getInstance()

export async function getCategoryCollection(): Promise<Collection> {
  return mongoHelper.getCollection('categories')
}
