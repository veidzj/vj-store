import { GetProductByIdRepositorySpy, UpdateProductRepositorySpy } from '@/tests/application/mocks'
import { mockUpdateProductInput, throwError } from '@/tests/domain/mocks'
import { DbUpdateProduct } from '@/application/usecases/product'

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
  })
})
