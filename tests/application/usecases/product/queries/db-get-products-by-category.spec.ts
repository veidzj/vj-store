import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { GetProductsByCategoryRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetProductsByCategory } from '@/application/usecases/product/queries'

interface Sut {
  sut: DbGetProductsByCategory
  getProductsByCategoryRepositorySpy: GetProductsByCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const getProductsByCategoryRepositorySpy = new GetProductsByCategoryRepositorySpy()
  const sut = new DbGetProductsByCategory(getProductsByCategoryRepositorySpy)
  return {
    sut,
    getProductsByCategoryRepositorySpy
  }
}

describe('DbGetProductsByCategory', () => {
  let page: number
  let limit: number

  beforeEach(() => {
    page = faker.number.int({ min: 0, max: 100 })
    limit = faker.number.int({ min: 0, max: 100 })
  })

  test('Should call GetProductsByCategoryRepository with correct values', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    await sut.getByCategory(page, limit)
    expect(getProductsByCategoryRepositorySpy.page).toBe(page)
    expect(getProductsByCategoryRepositorySpy.limit).toBe(limit)
  })

  test('Should throw if GetProductsByCategoryRepository throws', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    jest.spyOn(getProductsByCategoryRepositorySpy, 'getByCategory').mockImplementationOnce(throwError)
    const promise = sut.getByCategory(page, limit)
    await expect(promise).rejects.toThrow()
  })

  test('Should return all data on success', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    const { products, currentPage, totalPages, totalItems } = await sut.getByCategory(page, limit)
    expect(products).toEqual(getProductsByCategoryRepositorySpy.output.products)
    expect(currentPage).toEqual(getProductsByCategoryRepositorySpy.output.currentPage)
    expect(totalPages).toEqual(getProductsByCategoryRepositorySpy.output.totalPages)
    expect(totalItems).toEqual(getProductsByCategoryRepositorySpy.output.totalItems)
  })
})
