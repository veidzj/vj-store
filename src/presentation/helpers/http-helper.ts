import { type Response } from '@/presentation/protocols'

export class HttpHelper {
  public static badRequest(error: Error): Response {
    return {
      statusCode: 400,
      body: error
    }
  }
}
