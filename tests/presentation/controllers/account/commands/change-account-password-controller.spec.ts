import { faker } from '@faker-js/faker'

import { ChangeAccountPasswordController } from '@/presentation/controllers/account/commands'
import { type ChangeAccountPassword } from '@/domain/usecases/account/commands'

const mockRequest = (): ChangeAccountPasswordController.Request => ({
  currentPassword: faker.internet.password(),
  newPassword: faker.internet.password()
})

describe('ChangeAccountPasswordController', () => {
  test('Should call ChangeAccountPassword with correct values', async() => {
    class ChangeAccountPasswordSpy implements ChangeAccountPassword {
      public currentPassword: string
      public newPassword: string

      public async changePassword(currentPassword: string, newPassword: string): Promise<void> {
        this.currentPassword = currentPassword
        this.newPassword = newPassword
      }
    }
    const changeAccountPasswordSpy = new ChangeAccountPasswordSpy()
    const sut = new ChangeAccountPasswordController(changeAccountPasswordSpy)
    const request = mockRequest()
    await sut.handle(request)
    expect(changeAccountPasswordSpy.currentPassword).toBe(request.currentPassword)
    expect(changeAccountPasswordSpy.newPassword).toBe(request.newPassword)
  })
})
