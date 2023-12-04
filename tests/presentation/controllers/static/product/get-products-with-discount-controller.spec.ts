import { faker } from '@faker-js/faker'

import { GetProductsWithDiscountSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetProductsWithDiscountController } from '@/presentation/controllers/static/product'
import { HttpHelper } from '@/presentation/helpers'
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

const mockRequestWithPagination = (): GetProductsWithDiscountController.Request => ({
  page: faker.number.int().toString(),
  limit: faker.number.int().toString()
})

describe('GetProductsWithDiscountController', () => {
  test('Should call GetProductsWithDiscount with correct values without page and limit', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    jest.spyOn(getProductsWithDiscountSpy, 'getWithDiscount')
    await sut.handle(mockRequestWithoutPagination())
    expect(getProductsWithDiscountSpy.getWithDiscount).toHaveBeenCalledWith(DEFAULT_PAGE, DEFAULT_LIMIT)
  })

  test('Should call GetProductsWithDiscount with correct values with page and limit', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    jest.spyOn(getProductsWithDiscountSpy, 'getWithDiscount')
    const request = mockRequestWithPagination()
    await sut.handle(request)
    expect(getProductsWithDiscountSpy.getWithDiscount).toHaveBeenCalledWith(Number(request.page), Number(request.limit))
  })

  test('Should return serverError if GetProductsWithDiscount throws', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    jest.spyOn(getProductsWithDiscountSpy, 'getWithDiscount').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequestWithoutPagination())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut, getProductsWithDiscountSpy } = makeSut()
    const response = await sut.handle(mockRequestWithoutPagination())
    expect(response).toEqual(HttpHelper.ok(getProductsWithDiscountSpy.products))
  })
})
