import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type AddProductRepository } from '@/application/protocols/product/commands'

export class AddProductMongoRepository implements AddProductRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async add(input: AddProductRepository.Input): Promise<void> {
    const productCollection = this.mongoHelper.getCollection('products')
    await productCollection.insertOne(input)
  }
}
