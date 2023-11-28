import { faker } from '@faker-js/faker'

import { GetProductsByCategorySpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetProductsByCategoryController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { CategoryError } from '@/domain/errors'

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

const mockRequestWithoutPageAndLimit = (): GetProductsByCategoryController.Request => ({
  category: faker.word.words()
})

const mockRequestWithPageAndLimit = (): GetProductsByCategoryController.Request => ({
  category: faker.word.words(),
  page: faker.number.int().toString(),
  limit: faker.number.int().toString()
})

describe('GetProductsByCategoryController', () => {
  test('Should call GetProductsByCategory with correct values without page and limit', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithoutPageAndLimit()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledWith(request.category, DEFAULT_PAGE, DEFAULT_LIMIT)
  })

  test('Should call GetProductsByCategory with correct values with page and limit', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithPageAndLimit()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledWith(request.category, Number(request.page), Number(request.limit))
  })

  test('Should return badRequest if GetProductsByCategory throws a CategoryError', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory').mockImplementationOnce(() => { throw new CategoryError(errorMessage) })
    const response = await sut.handle(mockRequestWithPageAndLimit())
    expect(response).toEqual(HttpHelper.badRequest(new CategoryError(errorMessage)))
  })

  test('Should return serverError if GetProductsByCategory throws', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequestWithPageAndLimit())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    const response = await sut.handle(mockRequestWithPageAndLimit())
    expect(response).toEqual(HttpHelper.ok(getProductsByCategorySpy.products))
  })
})
