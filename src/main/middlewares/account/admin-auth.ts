import { ExpressMiddlewareAdapter } from '@/main/adapters'
import { AuthMiddlewareFactory } from '@/main/factories/middlewares'

export const adminAuth = ExpressMiddlewareAdapter.adapt(AuthMiddlewareFactory.makeAuthMiddleware('admin'))
