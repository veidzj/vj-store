import { type Express } from 'express'
import { serve, setup } from 'swagger-ui-express'

import swaggerConfig from '@/main/docs'

export class Swagger {
  public static readonly setup = (app: Express): void => {
    app.use('/api/docs', serve, setup(swaggerConfig))
  }
}
