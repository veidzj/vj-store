import { type Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb'

const mongoHelper: MongoHelper = MongoHelper.getInstance()

export async function getAccountCollection(): Promise<Collection> {
  return mongoHelper.getCollection('accounts')
}
