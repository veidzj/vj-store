import { faker } from '@faker-js/faker'

import { CheckCategoryByNameRepositorySpy, GetProductsByCategoryRepositorySpy } from '@/tests/application/mocks'
import { DbGetProductsByCategory } from '@/application/usecases/product'
import { CategoryNotFoundError } from '@/application/errors/category'

const category: string = faker.word.words()

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
    await sut.getByCategory(category)
    expect(checkCategoryByNameRepositorySpy.checkByName).toHaveBeenCalledWith(category)
  })

  test('Should throw CategoryNotFoundError if CheckCategoryByNameRepositorySpy returns false', async() => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    checkCategoryByNameRepositorySpy.output = false
    const promise = sut.getByCategory(category)
    await expect(promise).rejects.toThrow(new CategoryNotFoundError())
  })

  test('Should call GetProductsByCategoryRepository with correct category', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    jest.spyOn(getProductsByCategoryRepositorySpy, 'getByCategory')
    await sut.getByCategory(category)
    expect(getProductsByCategoryRepositorySpy.getByCategory).toHaveBeenCalledWith(category)
  })

  test('Should return all products on success', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    const products = await sut.getByCategory(category)
    expect(products).toEqual(getProductsByCategoryRepositorySpy.output)
  })
})
