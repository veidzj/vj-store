import { throwError } from '@/tests/test-helper'
import { CheckProductByIdRepositorySpy } from '@/tests/application/mocks/product/queries'
import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { DbUpdateProduct } from '@/application/usecases/product/commands'
import { ProductNotFoundError } from '@/domain/errors/product'

interface Sut {
  sut: DbUpdateProduct
  checkProductByIdRepositorySpy: CheckProductByIdRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
}

const makeSut = (): Sut => {
  const checkProductByIdRepositorySpy = new CheckProductByIdRepositorySpy()
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  const sut = new DbUpdateProduct(checkProductByIdRepositorySpy, checkCategoryByNameRepositorySpy)
  return {
    sut,
    checkProductByIdRepositorySpy,
    checkCategoryByNameRepositorySpy
  }
}

describe('DbUpdateProduct', () => {
  describe('CheckProductByIdRepository', () => {
    test('Should call CheckProductByIdRepository with correct id', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(checkProductByIdRepositorySpy.id).toBe(updateProductInput.id)
    })

    test('Should throw ProductNotFoundError if CheckProductByIdRepository returns false', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      checkProductByIdRepositorySpy.output = false
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow(new ProductNotFoundError())
    })

    test('Should throw if CheckProductByIdRepository throws', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      jest.spyOn(checkProductByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('CheckCategoryByNameRepository', () => {
    test('Should call CheckCategoryByNameRepository with correct name', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toBe(updateProductInput.category)
    })

    test('Should throw if CheckCategoryByNameRepository throws', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
