import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type LogErrorRepository } from '@/application/protocols/log'

export class LogErrorMongoRepository implements LogErrorRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public logError = async(stack: string): Promise<void> => {
    const errorCollection = this.mongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
