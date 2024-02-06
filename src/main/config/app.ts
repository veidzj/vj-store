import express, { type Express } from 'express'

import { Swagger, Middlewares, Routes } from '@/main/config'

export class App {
  public static readonly setup = async(): Promise<Express> => {
    const app = express()
    Swagger.setup(app)
    Middlewares.setup(app)
    await Routes.setup(app)
    return app
  }
}
