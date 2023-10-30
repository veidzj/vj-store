import { type Express } from 'express'
import request from 'supertest'
import { setupApp } from '@/main/config/app'

let app: Express

describe('BodyParser Middleware', () => {
  beforeAll(async() => {
    app = await setupApp()
  })

  test('Should parse body as json', async() => {
    app.post('/test_body_parser', (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post('/test_body_parser')
      .send({ username: 'any_name' })
      .expect({ username: 'any_name' })
  })
})
