import express, { type Express } from 'express'

import { Middlewares, setupRoutes } from '@/main/config'

export class App {
  public static setup = async(): Promise<Express> => {
    const app = express()
    Middlewares.setup(app)
    setupRoutes(app)
    return app
  }
}
