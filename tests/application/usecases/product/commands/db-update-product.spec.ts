import { CheckProductByIdRepositorySpy } from '@/tests/application/mocks/product/queries'
import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { DbUpdateProduct } from '@/application/usecases/product/commands'

interface Sut {
  sut: DbUpdateProduct
  checkProductByIdRepositorySpy: CheckProductByIdRepositorySpy
}

const makeSut = (): Sut => {
  const checkProductByIdRepositorySpy = new CheckProductByIdRepositorySpy()
  const sut = new DbUpdateProduct(checkProductByIdRepositorySpy)
  return {
    sut,
    checkProductByIdRepositorySpy
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
  })
})
