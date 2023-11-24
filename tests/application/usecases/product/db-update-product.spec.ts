import { GetProductByIdRepositorySpy, UpdateProductRepositorySpy } from '@/tests/application/mocks'
import { mockUpdateProductInput, throwError } from '@/tests/domain/mocks'
import { DbUpdateProduct } from '@/application/usecases/product'
import { ProductNotFoundError } from '@/application/errors/product'
import { ProductHelper } from '@/application/helpers'

interface Sut {
  sut: DbUpdateProduct
  getProductByIdRepositorySpy: GetProductByIdRepositorySpy
  updateProductRepositorySpy: UpdateProductRepositorySpy
}

const makeSut = (): Sut => {
  const getProductByIdRepositorySpy = new GetProductByIdRepositorySpy()
  const updateProductRepositorySpy = new UpdateProductRepositorySpy()
  const sut = new DbUpdateProduct(getProductByIdRepositorySpy, updateProductRepositorySpy)
  return {
    sut,
    getProductByIdRepositorySpy,
    updateProductRepositorySpy
  }
}

describe('DbUpdateProduct', () => {
  describe('GetProductByIdRepository', () => {
    test('Should call GetProductByIdRepository with correct id', async() => {
      const { sut, getProductByIdRepositorySpy } = makeSut()
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(getProductByIdRepositorySpy.id).toEqual(updateProductInput.productId)
    })

    test('Should throw if GetProductByIdRepository throws', async() => {
      const { sut, getProductByIdRepositorySpy } = makeSut()
      jest.spyOn(getProductByIdRepositorySpy, 'getById').mockImplementationOnce(throwError)
      const promise = sut.update(mockUpdateProductInput())
      await expect(promise).rejects.toThrow()
    })

    test('Should throw ProductNotFoundError if GetProductByIdRepository returns null', async() => {
      const { sut, getProductByIdRepositorySpy } = makeSut()
      getProductByIdRepositorySpy.output = null
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
  })
})
