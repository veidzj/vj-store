import { DbGetAllCategories } from '@/application/usecases/category/queries'
import { type GetAllCategoriesRepository } from '@/application/protocols/category/queries'
import { mockCategoriesOutput } from '@/tests/domain/mocks/category'

describe('DbGetAllCategories', () => {
  test('Should call GetAllCategoriesRepository', async() => {
    class GetAllCategoriesRepositorySpy implements GetAllCategoriesRepository {
      public output: GetAllCategoriesRepository.Output[] = mockCategoriesOutput()

      public async getAll(): Promise<GetAllCategoriesRepository.Output[]> {
        return this.output
      }
    }
    const getAllCategoriesRepositorySpy = new GetAllCategoriesRepositorySpy()
    const sut = new DbGetAllCategories(getAllCategoriesRepositorySpy)
    jest.spyOn(getAllCategoriesRepositorySpy, 'getAll')
    await sut.getAll()
    expect(getAllCategoriesRepositorySpy.getAll).toHaveBeenCalledTimes(1)
  })
})
