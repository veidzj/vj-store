import { faker } from '@faker-js/faker'

import { MongoHelper } from '@/infra/db/mongodb/helpers'

describe('MongoHelper', () => {
  test('Should throw if client is null', () => {
    const mongoHelper: MongoHelper = MongoHelper.getInstance()
    expect(() => {
      mongoHelper.getCollection(faker.word.words())
    }).toThrow()
  })
})
