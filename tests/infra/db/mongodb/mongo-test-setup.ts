import { type Collection } from 'mongodb'

import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { env } from '@/main/config'

const mongoHelper: MongoHelper = MongoHelper.getInstance()

export async function connectToDatabase(): Promise<void> {
  await mongoHelper.connect(env.mongoUrl)
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoHelper.disconnect()
}

export async function clearCollection(collection: Collection): Promise<void> {
  await collection.deleteMany({})
}

export async function getCollection(collection: string): Promise<Collection> {
  return mongoHelper.getCollection(collection)
}
