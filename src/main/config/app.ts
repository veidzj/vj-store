import express, { type Express } from 'express'
import { setupMiddlewares, setupRoutes } from '@/main/config'

export const setupApp = async(): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  setupRoutes(app)
  return app
}
