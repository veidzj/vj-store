import { Category } from '@/domain/entities/category'

describe('Category Entity', () => {
  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const sut = new Category('any_name')
    expect(sut.getId()).toBeTruthy()
    expect(sut.getName()).toBe('any_name')
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toEqual([])
  })
})
