import { faker } from '@faker-js/faker'

import { DbChangeEmail } from '@/application/usecases/account/commands'
import { EntityValidationError } from '@/domain/errors'

const invalidEmail = faker.word.words()
const validEmail = faker.internet.email()

describe('DbChangeEmail', () => {
  test('Should throw EntityValidationError if currentEmail is invalid', async() => {
    const sut = new DbChangeEmail()
    const promise = sut.change(invalidEmail, validEmail)
    await expect(promise).rejects.toThrow(new EntityValidationError('Email must be valid'))
  })
})
