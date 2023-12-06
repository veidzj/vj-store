import { faker } from '@faker-js/faker'

import { GetLatestProductsRepositorySpy } from '@/tests/application/mocks'
import { throwError } from '@/tests/domain/mocks'
import { DbGetLatestProducts } from '@/application/usecases/static/product'

const page: number = faker.number.int()
const limit: number = faker.number.int()

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
  test('Should call GetLatestProductsRepository with correct values', async() => {
    const { sut, getLatestProductsRepositorySpy } = makeSut()
    jest.spyOn(getLatestProductsRepositorySpy, 'getLatest')
    await sut.getLatest(page, limit)
    expect(getLatestProductsRepositorySpy.getLatest).toHaveBeenCalledWith(page, limit)
  })

  test('Should throw if GetLatestProductsRepository throws', async() => {
    const { sut, getLatestProductsRepositorySpy } = makeSut()
    jest.spyOn(getLatestProductsRepositorySpy, 'getLatest').mockImplementationOnce(throwError)
    const promise = sut.getLatest(page, limit)
    await expect(promise).rejects.toThrow()
  })

  test('Should return all products on success', async() => {
    const { sut, getLatestProductsRepositorySpy } = makeSut()
    const products = await sut.getLatest(page, limit)
    expect(products).toEqual(getLatestProductsRepositorySpy.output)
  })
})
