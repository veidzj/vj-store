import { faker } from '@faker-js/faker'

import { ChangeAccountPasswordSpy } from '@/tests/presentation/mocks/account'
import { ChangeAccountPasswordController } from '@/presentation/controllers/account/commands'

interface Sut {
  sut: ChangeAccountPasswordController
  changeAccountPasswordSpy: ChangeAccountPasswordSpy
}

const makeSut = (): Sut => {
  const changeAccountPasswordSpy = new ChangeAccountPasswordSpy()
  const sut = new ChangeAccountPasswordController(changeAccountPasswordSpy)
  return {
    sut,
    changeAccountPasswordSpy
  }
}

const mockRequest = (): ChangeAccountPasswordController.Request => ({
  currentPassword: faker.internet.password(),
  newPassword: faker.internet.password()
})

describe('ChangeAccountPasswordController', () => {
  test('Should call ChangeAccountPassword with correct values', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeAccountPasswordSpy.currentPassword).toBe(request.currentPassword)
    expect(changeAccountPasswordSpy.newPassword).toBe(request.newPassword)
  })
})
