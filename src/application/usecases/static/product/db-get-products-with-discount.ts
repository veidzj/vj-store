import { type GetProductsWithDiscountRepository } from '@/application/protocols/db/static/product'
import { type Product } from '@/domain/models'
import { type GetProductsWithDiscount } from '@/domain/usecases/static/product'

export class DbGetProductsWithDiscount implements GetProductsWithDiscount {
  constructor(private readonly getWithDiscountRepository: GetProductsWithDiscountRepository) {}

  public getWithDiscount = async(page: number, limit: number): Promise<Product[]> => {
    const products = await this.getWithDiscountRepository.getWithDiscount(page, limit)
    return products
  }
}
