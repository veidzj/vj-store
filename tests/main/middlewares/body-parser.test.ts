import { type Express } from 'express'
import request from 'supertest'
import { setupApp } from '@/main/config'
import { faker } from '@faker-js/faker'

const route: string = '/test_body_parser'
const data = {
  username: faker.person.firstName()
}

let app: Express

describe('BodyParser Middleware', () => {
  beforeAll(async() => {
    app = await setupApp()
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
