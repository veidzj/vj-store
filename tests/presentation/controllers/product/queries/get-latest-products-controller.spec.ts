import { faker } from '@faker-js/faker'

import { GetLatestProductsSpy } from '@/tests/presentation/mocks/product'
import { GetLatestProductsController } from '@/presentation/controllers/product/queries'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'

interface Sut {
  sut: GetLatestProductsController
  getLatestProductsSpy: GetLatestProductsSpy
}

const makeSut = (): Sut => {
  const getLatestProductsSpy = new GetLatestProductsSpy()
  const sut = new GetLatestProductsController(getLatestProductsSpy)
  return {
    sut,
    getLatestProductsSpy
  }
}

const mockRequestWithoutPagination = (): GetLatestProductsController.Request => ({})

const mockRequestWithPagination = (): GetLatestProductsController.Request => ({
  page: faker.number.int().toString(),
  limit: faker.number.int().toString()
})

describe('GetLatestProductsController', () => {
  test('Should call GetLatestProducts with default pagination', async() => {
    const { sut, getLatestProductsSpy } = makeSut()
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    await sut.handle(mockRequestWithoutPagination())
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledTimes(1)
    expect(getLatestProductsSpy.page).toBe(DEFAULT_PAGE)
    expect(getLatestProductsSpy.limit).toBe(DEFAULT_LIMIT)
  })

  test('Should call GetLatestProducts with given pagination', async() => {
    const { sut, getLatestProductsSpy } = makeSut()
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    const request = mockRequestWithPagination()
    await sut.handle(request)
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledTimes(1)
    expect(getLatestProductsSpy.page).toBe(Number(request.page))
    expect(getLatestProductsSpy.limit).toBe(Number(request.limit))
  })
})
