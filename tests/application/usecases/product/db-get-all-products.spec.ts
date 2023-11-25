import { GetAllProductsRepositorySpy } from '@/tests/application/mocks'
import { DbGetAllProducts } from '@/application/usecases/product'

interface Sut {
  sut: DbGetAllProducts
  getAllProductsRepositorySpy: GetAllProductsRepositorySpy
}

const makeSut = (): Sut => {
  const getAllProductsRepositorySpy = new GetAllProductsRepositorySpy()
  const sut = new DbGetAllProducts(getAllProductsRepositorySpy)
  return {
    sut,
    getAllProductsRepositorySpy
  }
}

describe('DbGetAllProducts', () => {
  test('Should call GetAllProductsRepository', async() => {
    const { sut, getAllProductsRepositorySpy } = makeSut()
    jest.spyOn(getAllProductsRepositorySpy, 'getAll')
    await sut.getAll()
    expect(getAllProductsRepositorySpy.getAll).toHaveBeenCalledTimes(1)
  })
})
