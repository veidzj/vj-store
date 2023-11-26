import { GetProductBySlugRepositorySpy } from '@/tests/application/mocks'
import { DbGetProductBySlug } from '@/application/usecases/product'
import { mockSlug } from '@/tests/domain/mocks'

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
})
