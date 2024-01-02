import { type Express } from 'express'
import request from 'supertest'
import { faker } from '@faker-js/faker'

import { App } from '@/main/config'

const route: string = '/test_body_parser'
const data = {
  username: faker.person.firstName()
}

describe('BodyParser Middleware', () => {
  let app: Express

  beforeAll(async() => {
    app = await App.setup()
  })

  test('Should parse body as json', async() => {
    app.post(route, (req, res) => {
      res.send(req.body)
    })
    await request(app)
      .post(route)
      .send(data)
      .expect(data)
  })
})
