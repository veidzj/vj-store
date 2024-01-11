export class ProductHelper {
  public static generateSlug(name: string): string {
    return name.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')
  }
}
