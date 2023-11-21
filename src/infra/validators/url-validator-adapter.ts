import validator from 'validator'
import { type UrlValidator } from '@/validation/protocols'

export class UrlValidatorAdapter implements UrlValidator {
  public isValid = (url: string): boolean => {
    return validator.isURL(url)
  }
}
