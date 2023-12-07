import { ProductError } from '@/domain/errors'

export class ProductNotFoundError extends ProductError {
  constructor() {
    super('Product not found')
    this.name = this.constructor.name
  }
}
