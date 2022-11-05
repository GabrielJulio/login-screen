import { HttpResponse } from './response'

export type HttpPostParams = {
  url: string
  body?: Object
}

export interface HttpPostClient {
  post: (data: HttpPostParams) => Promise<HttpResponse>
}
