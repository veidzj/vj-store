import { faker } from '@faker-js/faker'

import { ValidationSpy, GetProductsByCategorySpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetProductsByCategoryController } from '@/presentation/controllers/static/product'
import { HttpHelper } from '@/presentation/helpers'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'
import { CategoryError, ValidationError } from '@/domain/errors'

interface Sut {
  sut: GetProductsByCategoryController
  validationSpy: ValidationSpy
  getProductsByCategorySpy: GetProductsByCategorySpy
}

const makeSut = (): Sut => {
  const validationSpy = new ValidationSpy()
  const getProductsByCategorySpy = new GetProductsByCategorySpy()
  const sut = new GetProductsByCategoryController(validationSpy, getProductsByCategorySpy)
  return {
    sut,
    validationSpy,
    getProductsByCategorySpy
  }
}

const mockRequestWithoutPagination = (): GetProductsByCategoryController.Request => ({
  category: faker.word.words()
})

const mockRequestWithPagination = (): GetProductsByCategoryController.Request => ({
  category: faker.word.words(),
  page: faker.number.int().toString(),
  limit: faker.number.int().toString()
})

const mockRequestWithPaginationAndSort = (): GetProductsByCategoryController.Request => ({
  category: faker.word.words(),
  page: faker.number.int().toString(),
  limit: faker.number.int().toString(),
  sortBy: faker.word.words()
})

describe('GetProductsByCategoryController', () => {
  test('Should call Validation with correct values', async() => {
    const { sut, validationSpy } = makeSut()
    const request = mockRequestWithoutPagination()
    await sut.handle(request)
    expect(validationSpy.input).toEqual(request)
  })

  test('Should return badRequest if Validation throws an error', async() => {
    const { sut, validationSpy } = makeSut()
    const errorMessage = faker.word.words()
    validationSpy.validate = jest.fn(() => {
      throw new ValidationError(errorMessage)
    })
    const request = mockRequestWithoutPagination()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.badRequest(new ValidationError(errorMessage)))
  })

  test('Should call GetProductsByCategory with correct values without page and limit', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithoutPagination()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledWith(request.category, DEFAULT_PAGE, DEFAULT_LIMIT, undefined)
  })

  test('Should call GetProductsByCategory with correct values with page and limit', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithPagination()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledWith(request.category, Number(request.page), Number(request.limit), undefined)
  })

  test('Should call GetProductsByCategory with correct values with sort', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequestWithPaginationAndSort()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledWith(request.category, Number(request.page), Number(request.limit), request.sortBy)
  })

  test('Should return badRequest if GetProductsByCategory throws a CategoryError', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory').mockImplementationOnce(() => { throw new CategoryError(errorMessage) })
    const response = await sut.handle(mockRequestWithPagination())
    expect(response).toEqual(HttpHelper.badRequest(new CategoryError(errorMessage)))
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
    expect(response).toEqual(HttpHelper.ok(getProductsByCategorySpy.products))
  })
})
