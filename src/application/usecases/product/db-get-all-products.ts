import { type GetAllProductsRepository } from '@/application/protocols/db/static/product'
import { type Product } from '@/domain/models'
import { type GetAllProducts } from '@/domain/usecases/product'

export class DbGetAllProducts implements GetAllProducts {
  constructor(private readonly getAllProductsRepository: GetAllProductsRepository) {}

  public getAll = async(page?: number, limit?: number): Promise<Product[]> => {
    const products = await this.getAllProductsRepository.getAll(page, limit)
    return products
  }
}
