import { faker } from '@faker-js/faker'

import { CheckCategoryByNameRepositorySpy, GetProductsByCategoryRepositorySpy } from '@/tests/application/mocks'
import { DbGetProductsByCategory } from '@/application/usecases/static/product'
import { CategoryNotFoundError } from '@/application/errors/category'

const category: string = faker.word.words()
const page: number = faker.number.int()
const limit: number = faker.number.int()

interface Sut {
  sut: DbGetProductsByCategory
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  getProductsByCategoryRepositorySpy: GetProductsByCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const getProductsByCategoryRepositorySpy = new GetProductsByCategoryRepositorySpy()
  const sut = new DbGetProductsByCategory(checkCategoryByNameRepositorySpy, getProductsByCategoryRepositorySpy)
  return {
    sut,
    checkCategoryByNameRepositorySpy,
    getProductsByCategoryRepositorySpy
  }
}

describe('DbGetProductsByCategory', () => {
  test('Should call CheckCategoryByNameRepository with correct category', async() => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName')
    await sut.getByCategory(category, page, limit)
    expect(checkCategoryByNameRepositorySpy.checkByName).toHaveBeenCalledWith(category)
  })

  test('Should throw CategoryNotFoundError if CheckCategoryByNameRepositorySpy returns false', async() => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    checkCategoryByNameRepositorySpy.output = false
    const promise = sut.getByCategory(category, page, limit)
    await expect(promise).rejects.toThrow(new CategoryNotFoundError())
  })

  test('Should call GetProductsByCategoryRepository with correct category', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    jest.spyOn(getProductsByCategoryRepositorySpy, 'getByCategory')
    await sut.getByCategory(category, page, limit)
    expect(getProductsByCategoryRepositorySpy.getByCategory).toHaveBeenCalledWith(category, page, limit)
  })

  test('Should return all products on success', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    const products = await sut.getByCategory(category, page, limit)
    expect(products).toEqual(getProductsByCategoryRepositorySpy.output)
  })
})
