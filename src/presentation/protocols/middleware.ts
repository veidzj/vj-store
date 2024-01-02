import { type Response } from '@/presentation/protocols'

export interface Middleware<T = object> {
  handle: (request: T) => Promise<Response>
}
