import { AddCategoryController } from '@/presentation/controllers/category'
import { type AddCategory } from '@/domain/usecases/category'

describe('AddCategoryController', () => {
  test('Should call AddCategory with correct name', async() => {
    class AddCategorySpy implements AddCategory {
      public name: string

      public async add(name: string): Promise<void> {
        this.name = name
      }
    }
    const addCategorySpy = new AddCategorySpy()
    const sut = new AddCategoryController(addCategorySpy)
    await sut.handle({ name: 'any_name' })
    expect(addCategorySpy.name).toBe('any_name')
  })
})
