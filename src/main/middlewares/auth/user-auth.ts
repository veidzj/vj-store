import { ExpressMiddlewareAdapter } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export const userAuth = ExpressMiddlewareAdapter.adapt(makeAuthMiddleware('user'))
