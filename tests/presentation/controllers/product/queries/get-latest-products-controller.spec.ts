import { GetLatestProductsController } from '@/presentation/controllers/product/queries'
import { type GetLatestProducts } from '@/domain/usecases/product/queries'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'

describe('GetLatestProductsController', () => {
  test('Should call GetLatestProducts with default pagination', async() => {
    class GetLatestProductsSpy implements GetLatestProducts {
      public page: number
      public limit: number
      public output: GetLatestProducts.Output

      public async getLatest(page: number, limit: number): Promise<GetLatestProducts.Output> {
        this.page = page
        this.limit = limit
        return this.output
      }
    }
    const getLatestProductsSpy = new GetLatestProductsSpy()
    const sut = new GetLatestProductsController(getLatestProductsSpy)
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    await sut.handle({})
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledTimes(1)
    expect(getLatestProductsSpy.page).toBe(DEFAULT_PAGE)
    expect(getLatestProductsSpy.limit).toBe(DEFAULT_LIMIT)
  })
})
