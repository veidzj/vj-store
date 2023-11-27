import { faker } from '@faker-js/faker'

import { CheckCategoryByNameRepositorySpy, GetProductsByCategoryRepositorySpy } from '@/tests/application/mocks'
import { DbGetProductsByCategory } from '@/application/usecases/product'

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
  test('Should call CheckCategoryByNameRepositorySpy with correct category', async() => {
    const { sut, checkCategoryByNameRepositorySpy } = makeSut()
    jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName')
    const category = faker.word.words()
    await sut.getByCategory(category)
    expect(checkCategoryByNameRepositorySpy.checkByName).toHaveBeenCalledWith(category)
  })
})
