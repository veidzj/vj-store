import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { mockAddProductInput } from '@/tests/domain/mocks/product'
import { DbAddProduct } from '@/application/usecases/product/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'

describe('DbAddProduct', () => {
  describe('CheckCategoryByNameRepository', () => {
    test('Should call CheckCategoryByNameRepository with correct name', async() => {
      const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
      checkCategoryByNameRepositorySpy.output = true
      const sut = new DbAddProduct(checkCategoryByNameRepositorySpy)
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toBe(addProductInput.category)
    })

    test('Should throw CategoryNotFoundError if CheckCategoryByNameRepository returns false', async() => {
      const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
      const sut = new DbAddProduct(checkCategoryByNameRepositorySpy)
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow(new CategoryNotFoundError())
    })
  })
})
