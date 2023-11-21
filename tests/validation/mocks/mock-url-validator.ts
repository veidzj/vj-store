import { type UrlValidator } from '@/validation/protocols'

export class UrlValidatorSpy implements UrlValidator {
  public url: string
  public isUrlValid: boolean = true

  public isValid = (url: string): boolean => {
    this.url = url
    return this.isUrlValid
  }
}
