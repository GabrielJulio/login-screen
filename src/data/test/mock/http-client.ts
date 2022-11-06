import { HttpPostClient, HttpPostParams, HttpResponse, HttpStatusCode } from '@/data/protocols/http'

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
