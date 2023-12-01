import { GetProductsWithDiscountSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetProductsWithDiscountController } from '@/presentation/controllers/static/product'
import { HttpHelper } from '@/presentation/helpers'

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

  test('Should return serverError if GetProductsWithDiscount throws', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    jest.spyOn(getProductsWithDiscountSpy, 'getWithDiscount').mockImplementationOnce(throwError)
    const response = await sut.handle()
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
