import { faker } from '@faker-js/faker'

import { GetProductsWithDiscountRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetProductsWithDiscount } from '@/application/usecases/product/queries'

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
  let page: number
  let limit: number

  beforeEach(() => {
    page = faker.number.int({ min: 0, max: 100 })
    limit = faker.number.int({ min: 0, max: 100 })
  })

  test('Should call GetProductsWithDiscountRepository with correct values', async() => {
    const { sut, getProductsWithDiscountRepositorySpy } = makeSut()
    await sut.getWithDiscount(page, limit)
    expect(getProductsWithDiscountRepositorySpy.page).toBe(page)
    expect(getProductsWithDiscountRepositorySpy.limit).toBe(limit)
  })
})
