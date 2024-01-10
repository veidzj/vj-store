import { throwError } from '@/tests/test-helper'
import { UpdateCategorySpy } from '@/tests/presentation/mocks/category'
import { mockUpdateCategoryInput } from '@/tests/domain/mocks/category'
import { UpdateCategoryController } from '@/presentation/controllers/category/update-category-controller'
import { HttpHelper } from '@/presentation/helpers'

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
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
