import express, { type Express } from 'express'

import { setupMiddlewares, setupRoutes } from '@/main/config'

export class App {
  public static setup = async(): Promise<Express> => {
    const app = express()
    setupMiddlewares(app)
    setupRoutes(app)
    return app
  }
}
