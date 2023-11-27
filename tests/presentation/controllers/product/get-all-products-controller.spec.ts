import { GetAllProductsSpy } from '@/tests/presentation/mocks'
import { throwError } from '@/tests/domain/mocks'
import { GetAllProductsController } from '@/presentation/controllers/product'
import { HttpHelper } from '@/presentation/helpers'

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

  test('Should return serverError if GetAllProducts throws', async() => {
    const { sut, getAllProductsSpy } = makeSut()
    jest.spyOn(getAllProductsSpy, 'getAll').mockImplementationOnce(throwError)
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })

  test('Should return ok on success', async() => {
    const { sut, getAllProductsSpy } = makeSut()
    const response = await sut.handle({})
    expect(response).toEqual(HttpHelper.ok(getAllProductsSpy.products))
  })
})
