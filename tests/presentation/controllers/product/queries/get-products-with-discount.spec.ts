import { GetProductsWithDiscountSpy } from '@/tests/presentation/mocks/product'
import { GetProductsWithDiscountController } from '@/presentation/controllers/product/queries'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'

interface Sut {
  sut: GetProductsWithDiscountController
  getProductsWithDiscountSpy: GetProductsWithDiscountSpy
}

const makeSut = (): Sut => {
  const getProductsWithDiscountSpy = new GetProductsWithDiscountSpy()
  const sut = new GetProductsWithDiscountController(getProductsWithDiscountSpy)
  return {
    sut,
    getProductsWithDiscountSpy
  }
}

const mockRequestWithoutPagination = (): GetProductsWithDiscountController.Request => ({})

describe('GetProductsWithDiscountController', () => {
  test('Should call GetProductsWithDiscount with default pagination', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    jest.spyOn(getProductsWithDiscountSpy, 'getWithDiscount')
    await sut.handle(mockRequestWithoutPagination())
    expect(getProductsWithDiscountSpy.getWithDiscount).toHaveBeenCalledTimes(1)
    expect(getProductsWithDiscountSpy.page).toBe(DEFAULT_PAGE)
    expect(getProductsWithDiscountSpy.limit).toBe(DEFAULT_LIMIT)
  })
})
