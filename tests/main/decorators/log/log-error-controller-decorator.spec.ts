import { faker } from '@faker-js/faker'

import { LogErrorRepositorySpy } from '@/tests/application/mocks/log'
import { LogErrorControllerDecorator } from '@/main/decorators/log'
import { HttpHelper } from '@/presentation/helpers'
import { type Controller, type Response } from '@/presentation/protocols'

describe('LogErrorControllerDecorator', () => {
  test('Should call Controller with correct values', async() => {
    class ControllerSpy implements Controller {
      public response = HttpHelper.ok({})
      public request: object

      public async handle(request: object): Promise<Response> {
        this.request = request
        return this.response
      }
    }
    const controllerSpy = new ControllerSpy()
    const logErrorRepository = new LogErrorRepositorySpy()
    const sut = new LogErrorControllerDecorator(controllerSpy, logErrorRepository)
    const request = {
      message: faker.word.words()
    }
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })
})
