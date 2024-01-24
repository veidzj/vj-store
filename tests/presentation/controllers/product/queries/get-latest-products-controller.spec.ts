import { GetLatestProductsSpy } from '@/tests/presentation/mocks/product'
import { GetLatestProductsController } from '@/presentation/controllers/product/queries'
import { DEFAULT_PAGE, DEFAULT_LIMIT } from '@/presentation/constants'

interface Sut {
  sut: GetLatestProductsController
  getLatestProductsSpy: GetLatestProductsSpy
}

const makeSut = (): Sut => {
  const getLatestProductsSpy = new GetLatestProductsSpy()
  const sut = new GetLatestProductsController(getLatestProductsSpy)
  return {
    sut,
    getLatestProductsSpy
  }
}

describe('GetLatestProductsController', () => {
  test('Should call GetLatestProducts with default pagination', async() => {
    const { sut, getLatestProductsSpy } = makeSut()
    jest.spyOn(getLatestProductsSpy, 'getLatest')
    await sut.handle({})
    expect(getLatestProductsSpy.getLatest).toHaveBeenCalledTimes(1)
    expect(getLatestProductsSpy.page).toBe(DEFAULT_PAGE)
    expect(getLatestProductsSpy.limit).toBe(DEFAULT_LIMIT)
  })
})
