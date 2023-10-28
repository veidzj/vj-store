import { type Express } from 'express'
import request from 'supertest'
import { setupApp } from '@/main/config/app'

let app: Express

describe('ContentType Middleware', () => {
  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should return default content type as json', async() => {
    app.get('/test_content_type', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_content_type')
      .expect('content-type', /json/)
  })
})
