import { AddProductRepositorySpy } from '@/tests/application/mocks'
import { mockAddProductInput } from '@/tests/domain/mocks'
import { DbAddProduct } from '@/application/usecases/product'

interface Sut {
  sut: DbAddProduct
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): Sut => {
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(addProductRepositorySpy)
  return {
    sut,
    addProductRepositorySpy
  }
}

describe('DbAddProduct', () => {
  test('Should call AddProductRepository with correct values', async() => {
    const { sut, addProductRepositorySpy } = makeSut()
    const addProductInput = mockAddProductInput()
    await sut.add(addProductInput)
    expect(addProductRepositorySpy.input).toEqual(addProductInput)
  })
})
