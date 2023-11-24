import { AddProductRepositorySpy, CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks'
import { mockAddProductInput, throwError } from '@/tests/domain/mocks'
import { DbAddProduct } from '@/application/usecases/product'
import { ProductHelper } from '@/application/helpers'

interface Sut {
  sut: DbAddProduct
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): Sut => {
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(checkCategoryByNameRepositorySpy, addProductRepositorySpy)
  return {
    sut,
    checkCategoryByNameRepositorySpy,
    addProductRepositorySpy
  }
}

describe('DbAddProduct', () => {
  describe('CheckCategoryByNameRepository', () => {
    test('Should call CheckCategoryByNameRepository with correct value', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toEqual(addProductInput.category)
    })

    test('Should throw if CheckCategoryByNameRepository throws', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddProductRepository', () => {
    test('Should call AddProductRepository with correct values', async() => {
      const { sut, addProductRepositorySpy } = makeSut()
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      const expectedSlug = ProductHelper.generateSlug(addProductInput.name)
      expect(addProductRepositorySpy.input).toEqual({
        ...addProductInput,
        slug: expectedSlug
      })
    })

    test('Should throw if AddProductRepository throws', async() => {
      const { sut, addProductRepositorySpy } = makeSut()
      jest.spyOn(addProductRepositorySpy, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.add(mockAddProductInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
