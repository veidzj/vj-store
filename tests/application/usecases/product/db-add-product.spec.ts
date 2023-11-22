import { AddProductRepositorySpy } from '@/tests/application/mocks'
import { mockAddProductInput, throwError } from '@/tests/domain/mocks'
import { DbAddProduct } from '@/application/usecases/product'
import { ProductHelper } from '@/application/helpers'

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
