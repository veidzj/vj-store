import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { GetProductBySlugSpy } from '@/tests/presentation/mocks/product'
import { GetProductBySlugController } from '@/presentation/controllers/product/queries'
import { HttpHelper } from '@/presentation/helpers'
import { ProductNotFoundError } from '@/domain/errors/product'

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

  test('Should return notFound if GetProductBySlug throws ProductNotFoundError', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    jest.spyOn(getProductBySlugSpy, 'getBySlug').mockImplementationOnce(() => {
      throw new ProductNotFoundError()
    })
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.notFound(new ProductNotFoundError()))
  })

  test('Should return serverError if GetProductBySlug throws', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    jest.spyOn(getProductBySlugSpy, 'getBySlug').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut, getProductBySlugSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.ok({
      product: getProductBySlugSpy.output
    }))
  })
})
