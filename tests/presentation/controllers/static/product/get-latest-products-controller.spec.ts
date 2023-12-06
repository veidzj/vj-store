import { faker } from '@faker-js/faker'

import { GetLatestProductsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetLatestProductsController } from '@/presentation/controllers/static/product'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { HttpHelper } from '@/presentation/helpers'

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
  test('Should call GetLatestProducts with correct values without pagination', async() => {
    const { sut, getLatestProductsSpy } = makeSut()
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    await sut.handle(mockRequestWithoutPagination())
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledWith(DEFAULT_PAGE, DEFAULT_LIMIT)
  })

  test('Should call GetLatestProducts with correct values with pagination', async() => {
    const { sut, getLatestProductsSpy } = makeSut()
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    const request = mockRequestWithPagination()
    await sut.handle(request)
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledWith(Number(request.page), Number(request.limit))
  })

  test('Should return serverError if GetLatestProducts throws', async() => {
    const { sut, getLatestProductsSpy } = makeSut()
    jest.spyOn(getLatestProductsSpy, 'getLatest').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequestWithPagination())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
