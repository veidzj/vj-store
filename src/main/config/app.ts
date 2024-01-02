import express, { type Express } from 'express'

import { Middlewares, Routes } from '@/main/config'

export class App {
  public static setup = async(): Promise<Express> => {
    const app = express()
    Middlewares.setup(app)
    await Routes.setup(app)
    return app
  }
}
