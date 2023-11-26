import { faker } from '@faker-js/faker'

import { GetProductBySlugSpy } from '@/tests/presentation/mocks'
import { GetProductBySlugController } from '@/presentation/controllers/product'

interface Sut {
  sut: GetProductBySlugController
  getProductBySlugSpy: GetProductBySlugSpy
}

const makeSut = (): Sut => {
  const getProductBySlugSpy = new GetProductBySlugSpy()
  const sut = new GetProductBySlugController(getProductBySlugSpy)
  return {
    sut,
    getProductBySlugSpy
  }
}

const mockRequest = (): GetProductBySlugController.Request => ({
  slug: faker.word.words()
})

describe('GetProductBySlugController', () => {
  test('Should call GetProductBySlug with correct slug', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    jest.spyOn(getProductBySlugSpy, 'getBySlug')
    const request = mockRequest()
    await sut.handle(request)
    expect(getProductBySlugSpy.getBySlug).toHaveBeenCalledWith(request.slug)
  })
})
