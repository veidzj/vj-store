import { faker } from '@faker-js/faker'
import { ControllerSpy } from '@/tests/presentation/mocks'
import { LogErrorRepositorySpy } from '@/tests/application/mocks'
import { LogControllerDecorator } from '@/main/decorators/log'
import { HttpHelper } from '@/presentation/helpers'
import { type HttpResponse } from '@/presentation/protocols'

interface Sut {
  sut: LogControllerDecorator
  controllerSpy: ControllerSpy
  logErrorRepositorySpy: LogErrorRepositorySpy
}

const makeSut = (): Sut => {
  const controllerSpy = new ControllerSpy()
  const logErrorRepositorySpy = new LogErrorRepositorySpy()
  const sut = new LogControllerDecorator(controllerSpy, logErrorRepositorySpy)
  return {
    sut,
    controllerSpy,
    logErrorRepositorySpy
  }
}

const mockServerError = (): HttpResponse => {
  const fakeError = new Error()
  fakeError.stack = faker.word.words()
  return HttpHelper.serverError(fakeError)
}

describe('LogControllerDecorator', () => {
  describe('controller', () => {
    test('Should call controller handle with correct values', async() => {
      const { sut, controllerSpy } = makeSut()
      const request = faker.word.words()
      await sut.handle(request)
      expect(controllerSpy.request).toEqual(request)
    })

    test('Should return the same result as the controller', async() => {
      const { sut, controllerSpy } = makeSut()
      const httpResponse = await sut.handle(faker.word.words())
      expect(httpResponse).toEqual(controllerSpy.httpResponse)
    })
  })

  describe('LogErrorRepository', () => {
    test('Should call LogErrorRepository with correct error if controller returns a server error', async() => {
      const { sut, controllerSpy, logErrorRepositorySpy } = makeSut()
      const serverError = mockServerError()
      controllerSpy.httpResponse = serverError
      await sut.handle(faker.word.words())
      expect(logErrorRepositorySpy.stack).toBe(serverError.body.stack)
    })
  })
})
