import MockDate from 'mockdate'

import { Account } from '@/domain/entities/account'

describe('Account Entity', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should instantiate with correct values', () => {
    const currentDate = new Date()
    const sut = new Account('any_username', 'any_email@mail.com', 'any_password')

    expect(sut.getId()).toBeTruthy()
    expect(sut.getUsername()).toBe('any_username')
    expect(sut.getEmail()).toBe('any_email@mail.com')
    expect(sut.getPassword()).toBe('any_password')
    expect(sut.getIsActive()).toBe(true)
    expect(sut.getCreatedAt()).toEqual(currentDate)
    expect(sut.getUpdateHistory()).toEqual([])
  })
})
