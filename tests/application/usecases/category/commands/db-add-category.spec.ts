import MockDate from 'mockdate'

import { DbAddCategory } from '@/application/usecases/category/commands'
import { type AddCategoryRepository } from '@/application/protocols/category/commands'

describe('DbAddCategory', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call AddCategoryRepository with correct values', async() => {
    class AddCategoryRepositorySpy implements AddCategoryRepository {
      public input: AddCategoryRepository.Input

      public async add(input: AddCategoryRepository.Input): Promise<void> {
        this.input = input
      }
    }
    const addCategoryRepositorySpy = new AddCategoryRepositorySpy()
    const sut = new DbAddCategory(addCategoryRepositorySpy)
    await sut.add({ name: 'AnyName' })
    expect(addCategoryRepositorySpy.input.id).toBeTruthy()
    expect(addCategoryRepositorySpy.input.name).toBe('AnyName')
    expect(addCategoryRepositorySpy.input.createdAt).toEqual(new Date())
    expect(addCategoryRepositorySpy.input.updateHistory).toEqual([])
  })
})
