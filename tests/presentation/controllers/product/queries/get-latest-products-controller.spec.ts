import { GetLatestProductsController } from '@/presentation/controllers/product/queries'
import { type GetLatestProducts } from '@/domain/usecases/product/queries'

describe('GetLatestProductsController', () => {
  test('Should call GetLatestProducts', async() => {
    class GetLatestProductsSpy implements GetLatestProducts {
      public output: GetLatestProducts.Output

      public async getLatest(): Promise<GetLatestProducts.Output> {
        return this.output
      }
    }
    const getLatestProductsSpy = new GetLatestProductsSpy()
    const sut = new GetLatestProductsController(getLatestProductsSpy)
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    await sut.handle()
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledTimes(1)
  })
})
