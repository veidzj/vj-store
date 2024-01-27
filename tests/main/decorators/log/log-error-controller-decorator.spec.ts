import { faker } from '@faker-js/faker'

import { ControllerSpy } from '@/tests/presentation/mocks/controller'
import { LogErrorRepositorySpy } from '@/tests/application/mocks/log'
import { LogErrorControllerDecorator } from '@/main/decorators/log'
import { HttpHelper } from '@/presentation/helpers'
import { type Response } from '@/presentation/protocols'

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

const mockServerError = (): Response => {
  const fakeError = new Error()
  fakeError.stack = faker.word.words()
  return HttpHelper.serverError(fakeError)
}

describe('LogErrorControllerDecorator', () => {
  test('Should call Controller with correct values', async() => {
    const { sut, controllerSpy } = makeSut()
    const request = mockRequest()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })

  test('Should call LogErrorRepository with correct error if controller returns a serverError', async() => {
    const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
    const serverError = mockServerError()
    controllerSpy.response = serverError
    await sut.handle(mockRequest())
    expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
  })

  test('Should return the same result as the controller', async() => {
    const { sut, controllerSpy } = makeSut()
    const response = await sut.handle(mockRequest())
    expect(response).toEqual(controllerSpy.response)
  })
})
