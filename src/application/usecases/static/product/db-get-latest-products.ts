import { type GetLatestProductsRepository } from '@/application/protocols/db/static/product'
import { type Product } from '@/domain/models'
import { type GetLatestProducts } from '@/domain/usecases/static/product'

export class DbGetLatestProducts implements GetLatestProducts {
  constructor(private readonly getLatestProductsRepository: GetLatestProductsRepository) {}

  public getLatest = async(page: number, limit: number): Promise<Product[]> => {
    const products = await this.getLatestProductsRepository.getLatest(page, limit)
    return products
  }
}
