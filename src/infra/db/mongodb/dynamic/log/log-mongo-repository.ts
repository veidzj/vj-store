import { MongoHelper } from '@/infra/db/mongodb'
import { type LogErrorRepository } from '@/application/protocols/db/dynamic/log'

export class LogMongoRepository implements LogErrorRepository {
  public logError = async(stack: string): Promise<void> => {
    const errorCollection = MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
