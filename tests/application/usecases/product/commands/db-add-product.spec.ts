import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { DbAddProduct } from '@/application/usecases/product/commands'
import { mockAddProductInput } from '@/tests/domain/mocks/product'

describe('DbAddProduct', () => {
  describe('CheckCategoryByNameMongoRepository', () => {
    test('Should call CheckCategoryByNameMongoRepository with correct name', async() => {
      const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
      const sut = new DbAddProduct(checkCategoryByNameRepositorySpy)
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toBe(addProductInput.category)
    })
  })
})
