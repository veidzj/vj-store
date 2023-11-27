import { faker } from '@faker-js/faker'

import { GetProductsByCategorySpy } from '@/tests/presentation/mocks'
import { GetProductsByCategoryController } from '@/presentation/controllers/product'

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
})
