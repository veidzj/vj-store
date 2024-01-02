import { type Response } from '@/presentation/protocols'

export interface Middleware<T = any> {
  handle: (request: T) => Promise<Response>
}
