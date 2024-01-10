import { throwError } from '@/tests/test-helper'
import { UpdateCategorySpy } from '@/tests/presentation/mocks/category'
import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { UpdateCategoryController } from '@/presentation/controllers/category/update-category-controller'
import { HttpHelper } from '@/presentation/helpers'
import { CategoryNotFoundError } from '@/domain/errors/category'

interface Sut {
  sut: UpdateCategoryController
  updateCategorySpy: UpdateCategorySpy
}

const makeSut = (): Sut => {
  const updateCategorySpy = new UpdateCategorySpy()
  const sut = new UpdateCategoryController(updateCategorySpy)
  return {
    sut,
    updateCategorySpy
  }
}

const mockRequest = (): UpdateCategoryController.Request => mockUpdateCategoryInput()

describe('UpdateCategoryController', () => {
  test('Should call UpdateCategory with correct values', async() => {
    const { sut, updateCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(updateCategorySpy.input).toEqual(request)
  })

  test('Should return serverError if UpdateCategory throws', async() => {
    const { sut, updateCategorySpy } = makeSut()
    jest.spyOn(updateCategorySpy, 'update').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return notFound if UpdateCategory throws CategoryNotFoundError', async() => {
    const { sut, updateCategorySpy } = makeSut()
    jest.spyOn(updateCategorySpy, 'update').mockImplementationOnce(() => {
      throw new CategoryNotFoundError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.notFound(new CategoryNotFoundError()))
  })

  test('Should return ok on success', async() => {
    const { sut } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({ message: 'Category successfully updated' }))
  })
})
