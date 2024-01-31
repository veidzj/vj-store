import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { GetProductsByCategoryRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetProductsByCategory } from '@/application/usecases/product/queries'

interface Sut {
  sut: DbGetProductsByCategory
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  getProductsByCategoryRepositorySpy: GetProductsByCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const getProductsByCategoryRepositorySpy = new GetProductsByCategoryRepositorySpy()
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const sut = new DbGetProductsByCategory(checkCategoryByNameRepositorySpy, getProductsByCategoryRepositorySpy)
  return {
    sut,
    checkCategoryByNameRepositorySpy,
    getProductsByCategoryRepositorySpy
  }
}

describe('DbGetProductsByCategory', () => {
  let category: string
  let page: number
  let limit: number

  beforeEach(() => {
    category = faker.commerce.department()
    page = faker.number.int({ min: 0, max: 100 })
    limit = faker.number.int({ min: 0, max: 100 })
  })

  test('Should call CheckCategoryByNameRepository with correct value', async() => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    await sut.getByCategory(category, page, limit)
    expect(checkCategoryByNameRepositorySpy.name).toBe(category)
  })

  test('Should call GetProductsByCategoryRepository with correct values', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    await sut.getByCategory(category, page, limit)
    expect(getProductsByCategoryRepositorySpy.category).toBe(category)
    expect(getProductsByCategoryRepositorySpy.page).toBe(page)
    expect(getProductsByCategoryRepositorySpy.limit).toBe(limit)
  })

  test('Should throw if GetProductsByCategoryRepository throws', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    jest.spyOn(getProductsByCategoryRepositorySpy, 'getByCategory').mockImplementationOnce(throwError)
    const promise = sut.getByCategory(category, page, limit)
    await expect(promise).rejects.toThrow()
  })

  test('Should return all data on success', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    const { products, currentPage, totalPages, totalItems } = await sut.getByCategory(category, page, limit)
    expect(products).toEqual(getProductsByCategoryRepositorySpy.output.products)
    expect(currentPage).toEqual(getProductsByCategoryRepositorySpy.output.currentPage)
    expect(totalPages).toEqual(getProductsByCategoryRepositorySpy.output.totalPages)
    expect(totalItems).toEqual(getProductsByCategoryRepositorySpy.output.totalItems)
  })
})
