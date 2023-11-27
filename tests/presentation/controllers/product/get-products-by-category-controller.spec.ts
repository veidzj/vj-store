import { faker } from '@faker-js/faker'

import { GetProductsByCategorySpy } from '@/tests/presentation/mocks'
import { GetProductsByCategoryController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'
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

const mockRequest = (): GetProductsByCategoryController.Request => ({
  category: faker.word.words()
})

describe('GetProductsByCategoryController', () => {
  test('Should call GetProductsByCategory with correct category', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory')
    const request = mockRequest()
    await sut.handle(request)
    expect(getProductsByCategorySpy.getByCategory).toHaveBeenCalledWith(request.category)
  })

  test('Should return badRequest if GetProductsByCategory throws a CategoryError', async() => {
    const { sut, getProductsByCategorySpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(getProductsByCategorySpy, 'getByCategory').mockImplementationOnce(() => { throw new CategoryError(errorMessage) })
    const request = mockRequest()
    const response = await sut.handle(request)
    expect(response).toEqual(HttpHelper.badRequest(new CategoryError(errorMessage)))
  })
})
