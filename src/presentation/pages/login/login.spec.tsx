import React from "react"
import { render, RenderResult, fireEvent, cleanup } from "@testing-library/react"
import { Login } from "@/presentation/pages"
import { AuthenticationSpy, ValidationSpy } from "@/presentation/test/mock"
import faker from "faker"

type SutTypes = {
  sut: RenderResult
  validationSpy: ValidationSpy
  authenticationSpy: AuthenticationSpy
}

type SutParams = {
  errorMessage: string
}

const makeSut = (params?: SutParams): SutTypes => {
  const validationSpy = new ValidationSpy()
  const authenticationSpy = new AuthenticationSpy()
  validationSpy.errorMessage = params?.errorMessage
  const sut = render(<Login validation={validationSpy} authentication={authenticationSpy} />)

  return {
    sut,
    validationSpy,
    authenticationSpy
  }
}

const populateEmailField = (sut: RenderResult, email = faker.internet.email()): void => {
  const emailInput = sut.getByTestId("email")
  fireEvent.input(emailInput, { target: { value: email } })
}

const populatePasswordField = (sut: RenderResult, password = faker.internet.password()): void => {
  const passwordInput = sut.getByTestId("password")
  fireEvent.input(passwordInput, { target: { value: password } })
}

const createValidSubmit = (sut: RenderResult, email = faker.internet.email(), password = faker.internet.password()): void => {
  populateEmailField(sut, email)
  populatePasswordField(sut, password)
  const submitButton = sut.getByTestId("submit") as HTMLButtonElement
  fireEvent.click(submitButton)
}

const testStatusForField = (sut: RenderResult, fieldName: string, errorMessage?: string): void => {
  const fieldStatus = sut.getByTestId(`${fieldName}-status`)
  expect(fieldStatus.title).toBe(errorMessage || "Tudo certo!")
  expect(fieldStatus.textContent).toBe(errorMessage ? "🔴" : "🟢")
}

describe("Login Component", () => {
  afterEach(cleanup)

  test("Should start with initial state", () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    const errorWrap = sut.getByTestId("error-wrap")
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    testStatusForField(sut, "email", errorMessage)
    testStatusForField(sut, "password", errorMessage)
  })

  test("Should call Validation with correct email", () => {
    const { sut, validationSpy } = makeSut()
    const email = faker.internet.email()
    populateEmailField(sut, email)

    expect(validationSpy.fieldName).toBe("email")
    expect(validationSpy.fieldValue).toBe(email)
  })

  test("Should call Validation with correct password", () => {
    const { sut, validationSpy } = makeSut()
    const password = faker.internet.password()
    populatePasswordField(sut, password)

    expect(validationSpy.fieldName).toBe("password")
    expect(validationSpy.fieldValue).toBe(password)
  })

  test("Should show email error if validation fails", () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    populateEmailField(sut)

    testStatusForField(sut, "email", errorMessage)
  })

  test("Should show passsword error if validation fails", () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    populatePasswordField(sut)

    testStatusForField(sut, "password", errorMessage)
  })

  test("Should show valid email state if validation succeeds", () => {
    const { sut } = makeSut()
    const email = faker.internet.email()
    populateEmailField(sut, email)

    testStatusForField(sut, "email")
  })

  test("Should show valid password state if validation succeeds", () => {
    const { sut } = makeSut()
    const password = faker.internet.password()
    populatePasswordField(sut, password)

    testStatusForField(sut, "password")
  })

  test("Should enable submit button if login form is valid", () => {
    const { sut } = makeSut()
    createValidSubmit(sut)

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test("Should show spinner on submit", () => {
    const { sut } = makeSut()
    createValidSubmit(sut)

    const spinner = sut.getByTestId("spinner")
    expect(spinner).toBeTruthy()
  })

  test("Should call authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut()
    const email = faker.internet.email()
    const password = faker.internet.password()
    createValidSubmit(sut, email, password)

    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
