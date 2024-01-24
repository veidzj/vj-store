import { type GetLatestProducts } from '@/domain/usecases/product/queries'

export class GetLatestProductsController {
  constructor(private readonly getLatestProducts: GetLatestProducts) {}

  public async handle(): Promise<void> {
    await this.getLatestProducts.getLatest()
  }
}
