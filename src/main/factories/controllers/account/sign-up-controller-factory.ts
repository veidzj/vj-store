import { AddAccountFactory, AuthenticationFactory } from '@/main/factories/usecases/account'
import { type Controller } from '@/presentation/protocols'
import { SignUpController } from '@/presentation/controllers/account'

export class SignUpControllerFactory {
  public static makeSignUpController = (): Controller => {
    const controller = new SignUpController(AddAccountFactory.makeAddAccount(), AuthenticationFactory.makeAuthentication())
    return controller
  }
}
