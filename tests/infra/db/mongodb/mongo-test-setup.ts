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

export async function clearDatabase(collection: Collection): Promise<void> {
  await collection.deleteMany({})
}
