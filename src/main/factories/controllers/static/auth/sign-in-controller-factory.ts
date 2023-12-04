import { makeSignInValidation } from '@/main/factories/validations/auth'
import { makeDbAuthentication } from '@/main/factories/usecases/static/auth'
import { makeLogControllerDecorator } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/dynamic/auth'

export class SignInControllerFactory {
  public static makeSignInController = (): Controller => {
    const controller = new SignInController(makeSignInValidation(), makeDbAuthentication())
    return makeLogControllerDecorator(controller)
  }
}
