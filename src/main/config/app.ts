import express, { type Express } from 'express'

import { Middlewares, Routes } from '@/main/config'
import setupSwagger from '@/main/config/swagger'

export class App {
  public static setup = async(): Promise<Express> => {
    const app = express()
    setupSwagger(app)
    Middlewares.setup(app)
    Routes.setup(app)
    return app
  }
}
