export class CategoryHelper {
  public static formatName(name: string): string {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()
  }
}
