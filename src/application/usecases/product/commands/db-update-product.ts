import { type CheckProductByIdRepository } from '@/application/protocols/product/queries'
import { type UpdateProduct } from '@/domain/usecases/product/commands'

export class DbUpdateProduct implements UpdateProduct {
  constructor(private readonly checkProductByIdRepository: CheckProductByIdRepository) {}

  public async update(input: UpdateProduct.Input): Promise<void> {
    await this.checkProductByIdRepository.checkById(input.id)
  }
}
