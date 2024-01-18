import { mockUpdateProductInput } from '@/tests/domain/mocks/product'
import { DbUpdateProduct } from '@/application/usecases/product/commands'
import { type CheckProductByIdRepository } from '@/application/protocols/product/queries'

describe('DbUpdateProduct', () => {
  describe('CheckProductByIdRepository', () => {
    test('Should call CheckProductByIdRepository with correct id', async() => {
      class CheckProductByIdRepositorySpy implements CheckProductByIdRepository {
        public id: string
        public output: boolean = true

        public async checkById(id: string): Promise<boolean> {
          this.id = id
          return this.output
        }
      }
      const checkProductByIdRepositorySpy = new CheckProductByIdRepositorySpy()
      const sut = new DbUpdateProduct(checkProductByIdRepositorySpy)
      const updateProductInput = mockUpdateProductInput()
      await sut.update(updateProductInput)
      expect(checkProductByIdRepositorySpy.id).toBe(updateProductInput.id)
    })
  })
})
