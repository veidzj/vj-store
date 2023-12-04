import { type Express } from 'express'
import request from 'supertest'

import { App } from '@/main/config'

const route: string = '/test_cors'

let app: Express

describe('CORS Middleware', () => {
  beforeAll(async() => {
    app = await App.setup()
  })

  test('Should enable CORS', async() => {
    app.get(route, (req, res) => {
      res.send()
    })
    await request(app)
      .get(route)
      .expect('access-control-allow-origin', '*')
      .expect('access-control-allow-headers', '*')
      .expect('access-control-allow-methods', '*')
  })
})
