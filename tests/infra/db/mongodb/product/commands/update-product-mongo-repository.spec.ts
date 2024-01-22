import { Collection } from 'mongodb'

import { throwError } from '@/tests/test-helper'
import { connectToDatabase, disconnectFromDatabase, clearCollection } from '@/tests/infra/db/mongodb'
import { getProductCollection } from '@/tests/infra/db/mongodb/product'
import { mockAddProductRepositoryInput, mockUpdateProductRepositoryInput } from '@/tests/application/mocks/product/commands'
import { UpdateProductMongoRepository } from '@/infra/db/mongodb/product/commands'

let productCollection: Collection

const makeSut = (): UpdateProductMongoRepository => {
  return new UpdateProductMongoRepository()
}

describe('UpdateProductMongoRepository', () => {
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
    jest.spyOn(Collection.prototype, 'updateOne').mockImplementationOnce(throwError)
    const promise = sut.update(mockUpdateProductRepositoryInput())
    await expect(promise).rejects.toThrow()
  })

  test('Should update a product on success', async() => {
    const sut = makeSut()
    const addProductRepositoryInput = mockAddProductRepositoryInput()
    await productCollection.insertOne(addProductRepositoryInput)
    const updateProductRepositoryInput = { ...mockUpdateProductRepositoryInput(), id: addProductRepositoryInput.id }
    await sut.update(updateProductRepositoryInput)
    const updatedProduct = await productCollection.findOne({ id: addProductRepositoryInput.id })
    expect(updatedProduct?.id).toBe(updateProductRepositoryInput.id)
    expect(updatedProduct?.name).toBe(updateProductRepositoryInput.name)
    expect(updatedProduct?.description).toBe(updateProductRepositoryInput.description)
    expect(updatedProduct?.price).toBe(updateProductRepositoryInput.price)
    expect(updatedProduct?.discountPercentage).toBe(updateProductRepositoryInput.discountPercentage)
    expect(updatedProduct?.quantity).toBe(updateProductRepositoryInput.quantity)
    expect(updatedProduct?.category).toBe(updateProductRepositoryInput.category)
    expect(updatedProduct?.slug).toBe(updateProductRepositoryInput.slug)
    expect(updatedProduct?.imagesUrls).toEqual(updateProductRepositoryInput.imagesUrls)
    expect(updatedProduct?.createdAt).toEqual(addProductRepositoryInput.createdAt)
    expect(updatedProduct?.updatedAt).toEqual(updateProductRepositoryInput.updatedAt)
  })
})
