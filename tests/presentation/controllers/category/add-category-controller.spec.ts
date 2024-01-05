import { AddCategoryController } from '@/presentation/controllers/category'
import { mockAddCategoryInput } from '@/tests/domain/mocks/category'
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

const mockRequest = (): AddCategoryController.Request => mockAddCategoryInput()

describe('AddCategoryController', () => {
  test('Should call AddCategory with correct name', async() => {
    const { sut, addCategorySpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(addCategorySpy.input.name).toBe(request.name)
  })
})
