export enum HttpStatusCode {
  ok = 200,
  noContent = 204,
  badRequest = 400,
  notFound = 404,
  unathorized = 401,
  serverError = 500
}

export type HttpResponse<Type> = {
  statusCode: HttpStatusCode
  body?: any
}
