export class ProductHelper {
  public static generateSlug(value: string): string {
    return value.toLowerCase()
      .replace(/ /g, '-')
      .replace(/[^\w-]+/g, '')
  }
}
