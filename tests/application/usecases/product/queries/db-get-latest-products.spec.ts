import { faker } from '@faker-js/faker'

import { GetLatestProductsRepositorySpy } from '@/tests/application/mocks/product/queries'
import { DbGetLatestProducts } from '@/application/usecases/product/queries'

interface Sut {
  sut: DbGetLatestProducts
  getLatestProductsRepositorySpy: GetLatestProductsRepositorySpy
}

const makeSut = (): Sut => {
  const getLatestProductsRepositorySpy = new GetLatestProductsRepositorySpy()
  const sut = new DbGetLatestProducts(getLatestProductsRepositorySpy)
  return {
    sut,
    getLatestProductsRepositorySpy
  }
}

describe('DbGetLatestProducts', () => {
  let page: number
  let limit: number

  beforeEach(() => {
    page = faker.number.int({ min: 0, max: 100 })
    limit = faker.number.int({ min: 0, max: 100 })
  })

  test('Should call GetLatestProductsRepository with correct values', async() => {
    const { sut, getLatestProductsRepositorySpy } = makeSut()
    await sut.getLatest(page, limit)
    expect(getLatestProductsRepositorySpy.page).toBe(page)
    expect(getLatestProductsRepositorySpy.limit).toBe(limit)
  })
})
