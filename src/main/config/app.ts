import express, { type Express } from 'express'
import setupMiddlewares from './middlewares'

export const setupApp = async(): Promise<Express> => {
  const app = express()
  setupMiddlewares(app)
  return app
}
