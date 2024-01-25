import { DbGetLatestProducts } from '@/application/usecases/product/queries'
import { type GetLatestProductsRepository } from '@/application/protocols/product/queries'
import { type GetLatestProducts } from '@/domain/usecases/product/queries'

describe('DbGetLatestProducts', () => {
  test('Should call GetLatestProductsRepository with correct values', async() => {
    class GetLatestProductsRepositorySpy implements GetLatestProductsRepository {
      public page: number
      public limit: number
      public output: GetLatestProducts.Output

      public async getLatest(page: number, limit: number): Promise<GetLatestProducts.Output> {
        this.page = page
        this.limit = limit
        return this.output
      }
    }
    const getLatestProductsRepositorySpy = new GetLatestProductsRepositorySpy()
    const sut = new DbGetLatestProducts(getLatestProductsRepositorySpy)
    await sut.getLatest(1, 1)
  })
})
