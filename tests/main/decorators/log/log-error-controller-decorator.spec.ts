import { faker } from '@faker-js/faker'

import { ControllerSpy } from '@/tests/presentation/mocks/controller'
import { LogErrorRepositorySpy } from '@/tests/application/mocks/log'
import { LogErrorControllerDecorator } from '@/main/decorators/log'

interface Sut {
  sut: LogErrorControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): Sut => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogErrorControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

const mockRequest = (): object => ({
  message: faker.word.words()
})

describe('LogErrorControllerDecorator', () => {
  test('Should call Controller with correct values', async() => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should return the same result as the controller', async() => {
    const { sut, controllerSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(controllerSpy.response)
  })
})
