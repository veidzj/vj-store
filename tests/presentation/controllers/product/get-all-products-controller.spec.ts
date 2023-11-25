import { GetAllProductsSpy } from '@/tests/presentation/mocks'
import { GetAllProductsController } from '@/presentation/controllers/product'

interface Sut {
  sut: GetAllProductsController
  getAllProductsSpy: GetAllProductsSpy
}

const makeSut = (): Sut => {
  const getAllProductsSpy = new GetAllProductsSpy()
  const sut = new GetAllProductsController(getAllProductsSpy)
  return {
    sut,
    getAllProductsSpy
  }
}

describe('GetAllProductsController', () => {
  test('Should call GetAllProducts', async() => {
    const { sut, getAllProductsSpy } = makeSut()
    jest.spyOn(getAllProductsSpy, 'getAll')
    await sut.handle({})
    expect(getAllProductsSpy.getAll).toHaveBeenCalledTimes(1)
  })
})
