import { faker } from '@faker-js/faker'

import { GetProductsWithDiscountRepositorySpy } from '@/tests/application/mocks'
import { throwError } from '@/tests/domain/mocks'
import { DbGetProductsWithDiscount } from '@/application/usecases/static/product'

const page: number = faker.number.int()
const limit: number = faker.number.int()

interface Sut {
  sut: DbGetProductsWithDiscount
  getProductsWithDiscountRepositorySpy: GetProductsWithDiscountRepositorySpy
}

const makeSut = (): Sut => {
  const getProductsWithDiscountRepositorySpy = new GetProductsWithDiscountRepositorySpy()
  const sut = new DbGetProductsWithDiscount(getProductsWithDiscountRepositorySpy)
  return {
    sut,
    getProductsWithDiscountRepositorySpy
  }
}

describe('DbGetProductsWithDiscount', () => {
  test('Should call GetProductsWithDiscountRepository with correct values', async() => {
    const { sut, getProductsWithDiscountRepositorySpy } = makeSut()
    jest.spyOn(getProductsWithDiscountRepositorySpy, 'getWithDiscount')
    await sut.getWithDiscount(page, limit)
    expect(getProductsWithDiscountRepositorySpy.getWithDiscount).toHaveBeenCalledWith(page, limit)
  })

  test('Should throw if GetProductsWithDiscountRepository throws', async() => {
    const { sut, getProductsWithDiscountRepositorySpy } = makeSut()
    jest.spyOn(getProductsWithDiscountRepositorySpy, 'getWithDiscount').mockImplementationOnce(throwError)
    const promise = sut.getWithDiscount(page, limit)
    await expect(promise).rejects.toThrow()
  })
})
