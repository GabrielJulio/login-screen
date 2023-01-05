import { AxiosClient } from "./axios-client"
import { mockAxiosClient } from "@/infra/test/mock"
import { mockPostRequest } from "@/data/test/mock"
import axios from "axios"

jest.mock("axios")

type SutTypes = {
  sut: AxiosClient
  mockedAxios: jest.Mocked<typeof axios>
}

const makeSut = (): SutTypes => {
  const sut = new AxiosClient()
  const mockedAxios = mockAxiosClient()

  return {
    sut,
    mockedAxios
  }
}

describe("AxiosClient", () => {
  test("Should call axios with correct values", async () => {
    const request = mockPostRequest()
    const { sut, mockedAxios } = makeSut()
    await sut.post(request)
    expect(mockedAxios.post).toHaveBeenCalledWith(request.url, request.body)
  })

  test("Should return correct statusCode and body", () => {
    const { sut, mockedAxios } = makeSut()
    const promise = sut.post(mockPostRequest())
    expect(promise).toEqual(mockedAxios.post.mock.results[0].value)
  })
})
