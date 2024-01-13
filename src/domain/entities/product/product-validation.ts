import { EntityValidationError } from '@/domain/errors'
import isURL from 'validator/lib/isURL'

export class ProductValidation {
  public static validateName(name: string): void {
    if (name.length < 3) {
      throw new EntityValidationError('Name must be at least 3 characters long')
    }
    if (name.length > 20) {
      throw new EntityValidationError('Name must be less than or equal to 20 characters long')
    }
    if (!/^[A-Za-z]+(?: [A-Za-z0-9]+)*$/.test(name)) {
      throw new EntityValidationError('Name must contain only letters, numbers and spaces')
    }
  }

  public static validateDescription(description: string): void {
    if (description.length < 50) {
      throw new EntityValidationError('Description must be at least 50 characters long')
    }
    if (description.length > 300) {
      throw new EntityValidationError('Description must be less than or equal to 300 characters long')
    }
  }

  public static validateImagesUrls(imagesUrls: string[]): void {
    imagesUrls.forEach((imageUrl) => {
      if (!isURL(imageUrl)) {
        throw new EntityValidationError('Image url must be a valid url')
      }
    })
  }

  public static validatePrice(price: number): void {
    if (price < 1) {
      throw new EntityValidationError('Price must be at least $1')
    }
    if (price > 99999) {
      throw new EntityValidationError('Price must be less than or equal to $99.999')
    }
  }

  public static validateQuantity(quantity: number): void {
    if (quantity < 0) {
      throw new EntityValidationError('Quantity must be at least 0')
    }
  }
}
