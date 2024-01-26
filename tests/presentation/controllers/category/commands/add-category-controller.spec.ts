import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { AddCategorySpy } from '@/tests/presentation/mocks/category'
import { mockAddCategoryInput } from '@/tests/domain/mocks/category'
import { AddCategoryController } from '@/presentation/controllers/category/commands'
import { HttpHelper } from '@/presentation/helpers'
import { EntityValidationError } from '@/domain/errors'
import { CategoryAlreadyExistsError } from '@/domain/errors/category'

interface Sut {
  sut: AddCategoryController
  addCategorySpy: AddCategorySpy
}

const makeSut = (): Sut => {
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(addCategorySpy)
  return {
    sut,
    addCategorySpy
  }
}

const mockRequest = (): AddCategoryController.Request => mockAddCategoryInput()

describe('AddCategoryController', () => {
  test('Should call AddCategory with correct name', async() => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.input.name).toBe(request.name)
  })

  test('Should return badRequest if AddCategory throws EntityValidationError', async() => {
    const { sut, addCategorySpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(() => {
      throw new EntityValidationError(errorMessage)
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new EntityValidationError(errorMessage)))
  })

  test('Should return conflict if AddCategory throws CategoryAlreadyExistsError', async() => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(() => {
      throw new CategoryAlreadyExistsError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.conflict(new CategoryAlreadyExistsError()))
  })

  test('Should return serverError if AddCategory throws', async() => {
    const { sut, addCategorySpy } = makeSut()
    jest.spyOn(addCategorySpy, 'add').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({ message: 'Category successfully added' }))
  })
})
