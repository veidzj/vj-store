export interface Response {
  statusCode: number
  body: {
    message?: string
    stack?: string
  }
}
