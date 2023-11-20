import { AddProductRepositorySpy } from '@/tests/application/mocks'
import { mockAddProductInput, throwError } from '@/tests/domain/mocks'
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
    const expectedSlug = addProductInput.name.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
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
})
