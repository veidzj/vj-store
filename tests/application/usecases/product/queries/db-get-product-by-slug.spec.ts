import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckProductBySlugRepositorySpy, GetProductBySlugRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetProductBySlug } from '@/application/usecases/product/queries'
import { ProductNotFoundError } from '@/domain/errors/product'

interface Sut {
  sut: DbGetProductBySlug
  checkProductBySlugRepositorySpy: CheckProductBySlugRepositorySpy
  getProductBySlugRepositorySpy: GetProductBySlugRepositorySpy
}

const makeSut = (): Sut => {
  const checkProductBySlugRepositorySpy = new CheckProductBySlugRepositorySpy()
  const getProductBySlugRepositorySpy = new GetProductBySlugRepositorySpy()
  const sut = new DbGetProductBySlug(checkProductBySlugRepositorySpy, getProductBySlugRepositorySpy)
  return {
    sut,
    checkProductBySlugRepositorySpy,
    getProductBySlugRepositorySpy
  }
}

describe('DbGetProductBySlug', () => {
  let slug: string

  beforeEach(() => {
    slug = faker.word.words()
  })

  test('Should call CheckProductBySlugRepository with correct value', async() => {
    const { sut, checkProductBySlugRepositorySpy } = makeSut()
    await sut.getBySlug(slug)
    expect(checkProductBySlugRepositorySpy.slug).toBe(slug)
  })

  test('Should throw ProductNotFoundError if CheckProductBySlugRepository returns false', async() => {
    const { sut, checkProductBySlugRepositorySpy } = makeSut()
    checkProductBySlugRepositorySpy.output = false
    const promise = sut.getBySlug(slug)
    await expect(promise).rejects.toThrow(new ProductNotFoundError())
  })

  test('Should throw if CheckProductBySlugRepository throws', async() => {
    const { sut, checkProductBySlugRepositorySpy } = makeSut()
    jest.spyOn(checkProductBySlugRepositorySpy, 'checkBySlug').mockImplementationOnce(throwError)
    const promise = sut.getBySlug(slug)
    await expect(promise).rejects.toThrow()
  })

  test('Should call GetProductBySlugRepository with correct value', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    await sut.getBySlug(slug)
    expect(getProductBySlugRepositorySpy.slug).toBe(slug)
  })
})
