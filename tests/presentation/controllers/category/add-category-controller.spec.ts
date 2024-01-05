import { AddCategoryController } from '@/presentation/controllers/category'
import { AddCategorySpy } from '@/tests/presentation/mocks/category'

interface Sut {
  sut: AddCategoryController
  addCategorySpy: AddCategorySpy
}

const makeSut = (): Sut => {
  const addCategorySpy = new AddCategorySpy()
  const sut = new AddCategoryController(addCategorySpy)
  return {
    sut,
    addCategorySpy
  }
}

describe('AddCategoryController', () => {
  test('Should call AddCategory with correct name', async() => {
    const { sut, addCategorySpy } = makeSut()
    await sut.handle({ name: 'any_name' })
    expect(addCategorySpy.name).toBe('any_name')
  })
})
