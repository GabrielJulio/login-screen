import { HttpPostClient, HttpPostParams } from '@/data/protocols/http/post-client'
import { HttpResponse, HttpStatusCode } from '@/data/protocols/http/response'

export class HttpPostClientSpy<ParamType, ResponseType> implements HttpPostClient<ParamType, ResponseType> {
  url?: string
  body?: Object
  response: HttpResponse<ParamType> = {
    statusCode: HttpStatusCode.ok
  }

  async post (params: HttpPostParams<ParamType>): Promise<HttpResponse<ResponseType>> {
    this.url = params.url
    this.body = params.body
    return await Promise.resolve(this.response)
  }
}
