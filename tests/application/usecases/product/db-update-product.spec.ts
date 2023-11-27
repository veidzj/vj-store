import { CheckProductByIdRepositorySpy, UpdateProductRepositorySpy } from '@/tests/application/mocks'
import { mockUpdateProductInput, throwError } from '@/tests/domain/mocks'
import { DbUpdateProduct } from '@/application/usecases/product'
import { ProductNotFoundError } from '@/application/errors/product'
import { ProductHelper } from '@/application/helpers'

interface Sut {
  sut: DbUpdateProduct
  checkProductByIdRepositorySpy: CheckProductByIdRepositorySpy
  updateProductRepositorySpy: UpdateProductRepositorySpy
}

const makeSut = (): Sut => {
  const checkProductByIdRepositorySpy = new CheckProductByIdRepositorySpy()
  const updateProductRepositorySpy = new UpdateProductRepositorySpy()
  const sut = new DbUpdateProduct(checkProductByIdRepositorySpy, updateProductRepositorySpy)
  return {
    sut,
    checkProductByIdRepositorySpy,
    updateProductRepositorySpy
  }
}

describe('DbUpdateProduct', () => {
  describe('CheckProductByIdRepository', () => {
    test('Should call CheckProductByIdRepository with correct id', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(checkProductByIdRepositorySpy.id).toEqual(updateProductInput.id)
    })

    test('Should throw if CheckProductByIdRepository throws', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      jest.spyOn(checkProductByIdRepositorySpy, 'checkById').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw ProductNotFoundError if CheckProductByIdRepository returns false', async() => {
      const { sut, checkProductByIdRepositorySpy } = makeSut()
      checkProductByIdRepositorySpy.output = false
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow(new ProductNotFoundError())
    })
  })

  describe('UpdateProductRepository', () => {
    test('Should call UpdateProductRepository with correct values', async() => {
      const { sut, updateProductRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      const expectedSlug = ProductHelper.generateSlug(updateProductInput.name)
      expect(updateProductRepositorySpy.input).toEqual({
        ...updateProductInput,
        slug: expectedSlug
      })
    })

    test('Should throw if UpdateProductRepository throws', async() => {
      const { sut, updateProductRepositorySpy } = makeSut()
      jest.spyOn(updateProductRepositorySpy, 'update').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should not throw on success', async() => {
      const { sut } = makeSut()
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).resolves.not.toThrow()
    })
  })
})
