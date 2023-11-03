import { faker } from '@faker-js/faker'
import { LogControllerDecorator } from '@/main/decorators/log'
import { LogErrorRepositorySpy } from '@/tests/application/mocks'
import { ControllerSpy } from '@/tests/presentation/mocks'

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

describe('LogControllerDecorator', () => {
  test('Should call controller handle with correct values', async() => {
    const { sut, controllerSpy } = makeSut()
    const request = faker.word.words()
    await sut.handle(request)
    expect(controllerSpy.request).toEqual(request)
  })
})
