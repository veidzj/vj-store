import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { GetProductsByCategorySpy } from '@/tests/presentation/mocks/product'
import { GetProductsByCategoryController } from '@/presentation/controllers/product/queries'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { HttpHelper } from '@/presentation/helpers'

interface Sut {
  sut: GetProductsByCategoryController
  getProductsByCategorySpy: GetProductsByCategorySpy
}

const makeSut = (): Sut => {
  const getProductsByCategorySpy = new GetProductsByCategorySpy()
  const sut = new GetProductsByCategoryController(getProductsByCategorySpy)
  return {
    sut,
    getProductsByCategorySpy
  }
}

const mockRequestWithoutPagination = (): GetProductsByCategoryController.Request => ({
  category: faker.commerce.department()
})

const mockRequestWithPagination = (): GetProductsByCategoryController.Request => ({
  category: faker.commerce.department(),
  page: faker.number.int().toString(),
  limit: faker.number.int().toString()
})

describe('GetProductsByCategoryController', () => {
  test('Should call GetProductsByCategory with default pagination', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithoutPagination()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledTimes(1)
    expect(getProductsByCategorySpy.category).toBe(request.category)
    expect(getProductsByCategorySpy.page).toBe(DEFAULT_PAGE)
    expect(getProductsByCategorySpy.limit).toBe(DEFAULT_LIMIT)
  })

  test('Should call GetProductsByCategory with given pagination', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithPagination()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledTimes(1)
    expect(getProductsByCategorySpy.category).toBe(request.category)
    expect(getProductsByCategorySpy.page).toBe(Number(request.page))
    expect(getProductsByCategorySpy.limit).toBe(Number(request.limit))
  })

  test('Should return serverError if GetProductsByCategory throws', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequestWithPagination())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    const response = await sut.handle(mockRequestWithPagination())
    expect(response).toEqual(HttpHelper.ok({
      products: getProductsByCategorySpy.output.products,
      currentPage: getProductsByCategorySpy.output.currentPage,
      totalPages: getProductsByCategorySpy.output.totalPages,
      totalItems: getProductsByCategorySpy.output.totalItems
    }))
  })
})
