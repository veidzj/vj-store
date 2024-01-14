import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { mockAddProductInput } from '@/tests/domain/mocks/product'
import { DbAddProduct } from '@/application/usecases/product/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'

interface Sut {
  sut: DbAddProduct
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
}

const makeSut = (): Sut => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  checkCategoryByNameRepositorySpy.output = true
  const sut = new DbAddProduct(checkCategoryByNameRepositorySpy)
  return {
    sut,
    checkCategoryByNameRepositorySpy
  }
}

describe('DbAddProduct', () => {
  describe('CheckCategoryByNameRepository', () => {
    test('Should call CheckCategoryByNameRepository with correct name', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toBe(addProductInput.category)
    })

    test('Should throw CategoryNotFoundError if CheckCategoryByNameRepository returns false', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      checkCategoryByNameRepositorySpy.output = false
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow(new CategoryNotFoundError())
    })
  })
})
