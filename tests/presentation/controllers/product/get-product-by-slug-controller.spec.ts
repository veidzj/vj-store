import { faker } from '@faker-js/faker'

import { GetProductBySlugSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetProductBySlugController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'
import { ProductError } from '@/domain/errors'

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

  test('Should return badRequest if GetProductBySlug throws a ProductError', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    const errorMessage = faker.word.words()
    jest.spyOn(getProductBySlugSpy, 'getBySlug').mockImplementationOnce(() => { throw new ProductError(errorMessage) })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.badRequest(new ProductError(errorMessage)))
  })

  test('Should return serverError if GetProductBySlug throws', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    jest.spyOn(getProductBySlugSpy, 'getBySlug').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok success', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok(getProductBySlugSpy.product))
  })
})
