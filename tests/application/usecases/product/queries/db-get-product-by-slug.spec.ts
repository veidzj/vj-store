import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { GetProductBySlugRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetProductBySlug } from '@/application/usecases/product/queries'
import { ProductNotFoundError } from '@/domain/errors/product'

interface Sut {
  sut: DbGetProductBySlug
  getProductBySlugRepositorySpy: GetProductBySlugRepositorySpy
}

const makeSut = (): Sut => {
  const getProductBySlugRepositorySpy = new GetProductBySlugRepositorySpy()
  const sut = new DbGetProductBySlug(getProductBySlugRepositorySpy)
  return {
    sut,
    getProductBySlugRepositorySpy
  }
}

describe('DbGetProductBySlug', () => {
  let slug: string

  beforeEach(() => {
    slug = faker.word.words()
  })

  test('Should call GetProductBySlugRepository with correct value', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    await sut.getBySlug(slug)
    expect(getProductBySlugRepositorySpy.slug).toBe(slug)
  })

  test('Should throw ProductNotFoundError if GetProductBySlugRepository returns null', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    getProductBySlugRepositorySpy.output = null
    const promise = sut.getBySlug(slug)
    await expect(promise).rejects.toThrow(new ProductNotFoundError())
  })

  test('Should throw if GetProductBySlugRepository throws', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    jest.spyOn(getProductBySlugRepositorySpy, 'getBySlug').mockImplementationOnce(throwError)
    const promise = sut.getBySlug(slug)
    await expect(promise).rejects.toThrow()
  })

  test('Should return a product on success', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    const product = await sut.getBySlug(slug)
    expect(product).toEqual(getProductBySlugRepositorySpy.output)
  })
})
