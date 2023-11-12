import { type HttpResponse } from '@/presentation/protocols'
import { ServerError } from '@/presentation/errors'

export class HttpHelper {
  public ok(data: any): HttpResponse {
    return {
      statusCode: 200,
      body: data
    }
  }

  public badRequest(error: Error): HttpResponse {
    return {
      statusCode: 400,
      body: error
    }
  }

  public unauthorized(error: Error): HttpResponse {
    return {
      statusCode: 401,
      body: error
    }
  }

  public forbidden(error: Error): HttpResponse {
    return {
      statusCode: 403,
      body: error
    }
  }

  public serverError(error: Error): HttpResponse {
    return {
      statusCode: 500,
      body: new ServerError(error.stack)
    }
  }
}
