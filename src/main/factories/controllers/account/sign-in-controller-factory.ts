import { AuthenticationFactory } from '@/main/factories/usecases/account'
import { type Controller } from '@/presentation/protocols'
import { SignInController } from '@/presentation/controllers/account'

export class SignInControllerFactory {
  public static makeSignInController = (): Controller => {
    const controller = new SignInController(AuthenticationFactory.makeAuthentication())
    return controller
  }
}
