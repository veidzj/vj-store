import { GetProductBySlugRepositorySpy } from '@/tests/application/mocks'
import { DbGetProductBySlug } from '@/application/usecases/static/product'
import { mockSlug, throwError } from '@/tests/domain/mocks'
import { ProductNotFoundError } from '@/application/errors/product'

interface Sut {
  sut: DbGetProductBySlug
  getProductBySlugRepositorySpy: GetProductBySlugRepositorySpy
}

const makeSut = (): Sut => {
  const getProductBySlugRepositorySpy = new GetProductBySlugRepositorySpy()
  const sut = new DbGetProductBySlug(getProductBySlugRepositorySpy)
  return {
    sut,
    getProductBySlugRepositorySpy
  }
}

describe('DbGetProductBySlug', () => {
  test('Should call DbGetProductBySlugRepository with correct slug', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    jest.spyOn(getProductBySlugRepositorySpy, 'getBySlug')
    const slug = mockSlug()
    await sut.getBySlug(slug)
    expect(getProductBySlugRepositorySpy.getBySlug).toHaveBeenCalledWith(slug)
  })

  test('Should throw if DbGetProductBySlugRepository throws', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    jest.spyOn(getProductBySlugRepositorySpy, 'getBySlug').mockImplementationOnce(throwError)
    const promise = sut.getBySlug(mockSlug())
    await expect(promise).rejects.toThrow()
  })

  test('Should throw ProductNotFoundError if DbGetProductBySlugRepository returns null', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    getProductBySlugRepositorySpy.output = null
    const promise = sut.getBySlug(mockSlug())
    await expect(promise).rejects.toThrow(new ProductNotFoundError())
  })

  test('Should return a product on success', async() => {
    const { sut, getProductBySlugRepositorySpy } = makeSut()
    const product = await sut.getBySlug(mockSlug())
    expect(product).toEqual(getProductBySlugRepositorySpy.output)
  })
})
