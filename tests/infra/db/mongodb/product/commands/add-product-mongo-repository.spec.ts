import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { AddProductMongoRepository } from '@/infra/db/mongodb/product/commands'

let productCollection: Collection

const makeSut = (): AddProductMongoRepository => {
  return new AddProductMongoRepository()
}

describe('AddProductMongoRepository', () => {
  const sut = makeSut()

  beforeAll(async() => {
    await connectToDatabase()
  })

  afterAll(async() => {
    await disconnectFromDatabase()
  })

  beforeEach(async() => {
    productCollection = await getProductCollection()
    await clearCollection(productCollection)
  })

  test('Should throw if mongo throws', async() => {
    jest.spyOn(Collection.prototype, 'insertOne').mockImplementationOnce(throwError)
    const promise = sut.add(mockAddProductRepositoryInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should add a Product on success', async() => {
    const addProductRepositoryInput = mockAddProductRepositoryInput()
    await sut.add(addProductRepositoryInput)
    const count = await productCollection.countDocuments()
    const account = await productCollection.findOne({ id: addProductRepositoryInput.id })
    expect(count).toBe(1)
    expect(account?.id).toBe(addProductRepositoryInput.id)
    expect(account?.name).toBe(addProductRepositoryInput.name)
    expect(account?.description).toBe(addProductRepositoryInput.description)
    expect(account?.price).toBe(addProductRepositoryInput.price)
    expect(account?.discountPercentage).toBe(addProductRepositoryInput.discountPercentage)
    expect(account?.quantity).toBe(addProductRepositoryInput.quantity)
    expect(account?.category).toBe(addProductRepositoryInput.category)
    expect(account?.slug).toBe(addProductRepositoryInput.slug)
    expect(account?.createdAt).toEqual(addProductRepositoryInput.createdAt)
    expect(account?.updatedAt).toEqual(addProductRepositoryInput.updatedAt)
  })
})
