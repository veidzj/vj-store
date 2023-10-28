import { type Express } from 'express'
import { bodyParser } from '@/main/middlewares/body-parser'
import { contentType } from '@/main/middlewares/content-type'

export default (app: Express): void => {
  app.use(bodyParser)
  app.use(contentType)
}
