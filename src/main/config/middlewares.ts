import { type Express } from 'express'

import { bodyParser, contentType } from '@/main/middlewares'

export class Middlewares {
  public static setup = (app: Express): void => {
    app.use(bodyParser)
    app.use(contentType)
  }
}
