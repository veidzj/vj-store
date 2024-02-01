import { MongoClient, type Collection, type WithId, type Document } from 'mongodb'

export class MongoHelper {
  private static instance: MongoHelper
  private client: MongoClient | null = null
  private uri: string | null = null

  private constructor() {}

  public static getInstance(): MongoHelper {
    if (!MongoHelper.instance) {
      MongoHelper.instance = new MongoHelper()
    }

    return MongoHelper.instance
  }

  public async connect(uri: string): Promise<void> {
    this.uri = uri
    this.client = await MongoClient.connect(uri)
  }

  public async disconnect(): Promise<void> {
    if (this.client) {
      await this.client.close()
      this.client = null
    }
  }

  public getCollection(name: string): Collection {
    if (!this.client) {
      throw new Error('No active connection to the database')
    }
    return this.client.db().collection(name)
  }

  public map<T>(mongoDoc: WithId<Document>): T {
    return mongoDoc as T
  }

  public mapCollection(collection: any[]): any {
    return collection.map(c => c)
  }
}
