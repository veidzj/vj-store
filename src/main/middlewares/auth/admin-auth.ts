import { ExpressMiddlewareAdapter } from '@/main/adapters'
import { makeAuthMiddleware } from '@/main/factories/middlewares'

export const adminAuth = ExpressMiddlewareAdapter.adapt(makeAuthMiddleware('admin'))
