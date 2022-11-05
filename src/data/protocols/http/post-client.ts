export type HttpPostParams = {
  url: string
  body?: Object
}

export interface HttpPostClient {
  post: (data: HttpPostParams) => Promise<void>
}
