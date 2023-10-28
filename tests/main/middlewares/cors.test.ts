import { type Express } from 'express'
import request from 'supertest'
import { setupApp } from '@/main/config/app'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should enable CORS', async() => {
    app.get('/test_cors', (req, res) => {
      res.send()
    })
    await request(app)
      .get('/test_cors')
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
