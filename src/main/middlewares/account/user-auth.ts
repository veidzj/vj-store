import { ExpressMiddlewareAdapter } from '@/main/adapters'
import { AuthMiddlewareFactory } from '@/main/factories/middlewares'

export const userAuth = ExpressMiddlewareAdapter.adapt(AuthMiddlewareFactory.makeAuthMiddleware('user'))
