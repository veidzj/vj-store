import { faker } from '@faker-js/faker'

import { throwError } from '@/tests/test-helper'
import { ChangeAccountPasswordSpy } from '@/tests/presentation/mocks/account'
import { ChangeAccountPasswordController } from '@/presentation/controllers/account/commands'
import { HttpHelper } from '@/presentation/helpers'

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
  accountEmail: faker.internet.email(),
  currentPassword: faker.internet.password(),
  newPassword: faker.internet.password()
})

describe('ChangeAccountPasswordController', () => {
  test('Should call ChangeAccountPassword with correct values', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(changeAccountPasswordSpy.accountEmail).toBe(request.accountEmail)
    expect(changeAccountPasswordSpy.currentPassword).toBe(request.currentPassword)
    expect(changeAccountPasswordSpy.newPassword).toBe(request.newPassword)
  })

  test('Should return serverError if ChangeAccountPassword throws', async() => {
    const { sut, changeAccountPasswordSpy } = makeSut()
    jest.spyOn(changeAccountPasswordSpy, 'changePassword').mockImplementationOnce(throwError)
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(HttpHelper.serverError(new Error()))
  })
})
