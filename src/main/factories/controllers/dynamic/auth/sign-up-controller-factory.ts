import { SignUpValidationFactory } from '@/main/factories/validations/auth'
import { AddAccountFactory } from '@/main/factories/usecases/dynamic/auth'
import { AuthenticationFactory } from '@/main/factories/usecases/static/auth'
import { LogControllerDecoratorFactory } from '@/main/factories/decorators/log'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/dynamic/auth'

export class SignUpControllerFactory {
  public static makeSignUpController = (): Controller => {
    const controller = new SignUpController(SignUpValidationFactory.makeSignUpValidation(), AddAccountFactory.makeAddAccount(), AuthenticationFactory.makeAuthentication())
    return LogControllerDecoratorFactory.makeLogControllerDecorator(controller)
  }
}
