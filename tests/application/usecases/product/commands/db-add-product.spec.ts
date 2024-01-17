import MockDate from 'mockdate'

import { throwError } from '@/tests/test-helper'
import { CheckProductByNameRepositorySpy } from '@/tests/application/mocks/product/queries'
import { CheckCategoryByNameRepositorySpy } from '@/tests/application/mocks/category/queries'
import { AddProductRepositorySpy } from '@/tests/application/mocks/product/commands'
import { mockAddProductInput } from '@/tests/domain/mocks/product'
import { DbAddProduct } from '@/application/usecases/product/commands'
import { CategoryNotFoundError } from '@/domain/errors/category'
import { ProductHelper } from '@/domain/entities/product'

interface Sut {
  sut: DbAddProduct
  checkProductByNameRepository: CheckProductByNameRepositorySpy
  checkCategoryByNameRepositorySpy: CheckCategoryByNameRepositorySpy
  addProductRepositorySpy: AddProductRepositorySpy
}

const makeSut = (): Sut => {
  const checkProductByNameRepository = new CheckProductByNameRepositorySpy()
  const checkCategoryByNameRepositorySpy = new CheckCategoryByNameRepositorySpy()
  checkCategoryByNameRepositorySpy.output = true
  const addProductRepositorySpy = new AddProductRepositorySpy()
  const sut = new DbAddProduct(checkProductByNameRepository, checkCategoryByNameRepositorySpy, addProductRepositorySpy)
  return {
    sut,
    checkProductByNameRepository,
    checkCategoryByNameRepositorySpy,
    addProductRepositorySpy
  }
}

describe('DbAddProduct', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  describe('CheckProductByNameRepository', () => {
    test('Should call CheckProductByNameRepository with correct name', async() => {
      const { sut, checkProductByNameRepository } = makeSut()
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(checkProductByNameRepository.name).toBe(addProductInput.name)
    })
  })

  describe('CheckCategoryByNameRepository', () => {
    test('Should call CheckCategoryByNameRepository with correct name', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(checkCategoryByNameRepositorySpy.name).toBe(addProductInput.category)
    })

    test('Should throw CategoryNotFoundError if CheckCategoryByNameRepository returns false', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      checkCategoryByNameRepositorySpy.output = false
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow(new CategoryNotFoundError())
    })

    test('Should throw if CheckCategoryByNameRepository throws', async() => {
      const { sut, checkCategoryByNameRepositorySpy } = makeSut()
      jest.spyOn(checkCategoryByNameRepositorySpy, 'checkByName').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow()
    })
  })

  describe('AddProductRepository', () => {
    test('Should call AddProductRepository with correct values', async() => {
      const { sut, addProductRepositorySpy } = makeSut()
      const addProductInput = mockAddProductInput()
      await sut.add(addProductInput)
      expect(addProductRepositorySpy.input.id).toBeTruthy()
      expect(addProductRepositorySpy.input.name).toBe(addProductInput.name)
      expect(addProductRepositorySpy.input.description).toBe(addProductInput.description)
      expect(addProductRepositorySpy.input.price).toBe(addProductInput.price)
      expect(addProductRepositorySpy.input.discountPercentage).toBe(addProductInput.discountPercentage)
      expect(addProductRepositorySpy.input.quantity).toBe(addProductInput.quantity)
      expect(addProductRepositorySpy.input.category).toBe(addProductInput.category)
      expect(addProductRepositorySpy.input.slug).toBe(ProductHelper.generateSlug(addProductInput.name))
      expect(addProductRepositorySpy.input.imagesUrls).toBe(addProductInput.imagesUrls)
      expect(addProductRepositorySpy.input.createdAt).toEqual(new Date())
      expect(addProductRepositorySpy.input.updateHistory).toEqual([])
    })

    test('Should throw if AddProductRepository throws', async() => {
      const { sut, addProductRepositorySpy } = makeSut()
      jest.spyOn(addProductRepositorySpy, 'add').mockImplementationOnce(throwError)
      const promise = sut.add(mockAddProductInput())
      await expect(promise).rejects.toThrow()
    })
  })
})
