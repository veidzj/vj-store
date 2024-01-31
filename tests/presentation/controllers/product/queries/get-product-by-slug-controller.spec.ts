import { faker } from '@faker-js/faker'

import { GetProductBySlugSpy } from '@/tests/presentation/mocks/product'
import { GetProductBySlugController } from '@/presentation/controllers/product/queries'

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
  test('Should call GetProductBySlug with corret value', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(getProductBySlugSpy.slug).toBe(request.slug)
  })
})
