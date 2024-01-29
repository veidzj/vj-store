import { faker } from '@faker-js/faker'

import { GetProductsByCategorySpy } from '@/tests/presentation/mocks/product'
import { GetProductsByCategoryController } from '@/presentation/controllers/product/queries'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'

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

const mockRequestWithoutPagination = (): GetProductsByCategoryController.Request => ({})

const mockRequestWithPagination = (): GetProductsByCategoryController.Request => ({
  page: faker.number.int().toString(),
  limit: faker.number.int().toString()
})

describe('GetProductsByCategoryController', () => {
  test('Should call GetProductsByCategory with default pagination', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    await sut.handle(mockRequestWithoutPagination())
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledTimes(1)
    expect(getProductsByCategorySpy.page).toBe(DEFAULT_PAGE)
    expect(getProductsByCategorySpy.limit).toBe(DEFAULT_LIMIT)
  })

  test('Should call GetProductsByCategory with given pagination', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithPagination()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledTimes(1)
    expect(getProductsByCategorySpy.page).toBe(Number(request.page))
    expect(getProductsByCategorySpy.limit).toBe(Number(request.limit))
  })
})
