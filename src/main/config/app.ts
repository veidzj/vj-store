import express, { type Express } from 'express'

import { Routes } from '@/main/config'

export class App {
  public static setup = async(): Promise<Express> => {
    const app = express()
    Routes.setup(app)
    return app
  }
}
