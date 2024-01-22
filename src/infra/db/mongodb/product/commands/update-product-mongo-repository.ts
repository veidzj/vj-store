import { MongoHelper } from '@/infra/db/mongodb/helpers'
import { type UpdateProductRepository } from '@/application/protocols/product/commands'

export class UpdateProductMongoRepository implements UpdateProductRepository {
  private readonly mongoHelper: MongoHelper = MongoHelper.getInstance()

  public async update(input: UpdateProductRepository.Input): Promise<void> {
    const productCollection = this.mongoHelper.getCollection('products')
    await productCollection.updateOne({
      id: input.id
    }, {
      $set: input
    })
  }
}
