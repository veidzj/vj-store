import { GetProductsWithDiscountSpy } from '@/tests/presentation/mocks'
import { GetProductsWithDiscountController } from '@/presentation/controllers/static/product'

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

describe('GetProductsWithDiscountController', () => {
  test('Should call GetProductsWithDiscount', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    jest.spyOn(getProductsWithDiscountSpy, 'getWithDiscount')
    await sut.handle()
    expect(getProductsWithDiscountSpy.getWithDiscount).toHaveBeenCalledTimes(1)
  })
})
