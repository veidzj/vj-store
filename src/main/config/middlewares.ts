import { type Express } from 'express'

import { bodyParser, contentType, cors } from '@/main/middlewares'

export class Middlewares {
  public static readonly setup = (app: Express): void => {
    app.use(bodyParser)
    app.use(contentType)
    app.use(cors)
  }
}
