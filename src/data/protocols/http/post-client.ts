import { HttpResponse } from './response'

export type HttpPostParams<Type> = {
  url: string
  body?: Object
}

export interface HttpPostClient<ParamType, ResponseType> {
  post: (data: HttpPostParams<ParamType>) => Promise<HttpResponse<ResponseType>>
}
