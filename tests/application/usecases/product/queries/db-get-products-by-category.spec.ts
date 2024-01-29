import { faker } from '@faker-js/faker'

import { GetProductsByCategoryRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetProductsByCategory } from '@/application/usecases/product/queries'

interface Sut {
  sut: DbGetProductsByCategory
  getProductsByCategoryRepositorySpy: GetProductsByCategoryRepositorySpy
}

const makeSut = (): Sut => {
  const getProductsByCategoryRepositorySpy = new GetProductsByCategoryRepositorySpy()
  const sut = new DbGetProductsByCategory(getProductsByCategoryRepositorySpy)
  return {
    sut,
    getProductsByCategoryRepositorySpy
  }
}

describe('DbGetProductsByCategory', () => {
  let page: number
  let limit: number

  beforeEach(() => {
    page = faker.number.int({ min: 0, max: 100 })
    limit = faker.number.int({ min: 0, max: 100 })
  })

  test('Should call GetProductsByCategoryRepository with correct values', async() => {
    const { sut, getProductsByCategoryRepositorySpy } = makeSut()
    await sut.getByCategory(page, limit)
    expect(getProductsByCategoryRepositorySpy.page).toBe(page)
    expect(getProductsByCategoryRepositorySpy.limit).toBe(limit)
  })
})
