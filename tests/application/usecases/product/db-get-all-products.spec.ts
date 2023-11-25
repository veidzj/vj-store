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

  test('Should return all products on success', async() => {
    const { sut, getAllProductsRepositorySpy } = makeSut()
    const products = await sut.getAll()
    expect(products).toEqual(getAllProductsRepositorySpy.products)
  })
})
