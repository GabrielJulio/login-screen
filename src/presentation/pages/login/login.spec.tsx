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

describe("Login Component", () => {
  afterEach(cleanup)

  test("Should start with initial state", () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    const errorWrap = sut.getByTestId("error-wrap")
    expect(errorWrap.childElementCount).toBe(0)

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(true)

    const emailStatus = sut.getByTestId("email-status")
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe("🔴")

    const passwordStatus = sut.getByTestId("password-status")
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe("🔴")
  })

  test("Should call Validation with correct email", () => {
    const { sut, validationSpy } = makeSut()
    const emailInput = sut.getByTestId("email")
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })
    expect(validationSpy.fieldName).toBe("email")
    expect(validationSpy.fieldValue).toBe(email)
  })

  test("Should call Validation with correct password", () => {
    const { sut, validationSpy } = makeSut()
    const passwordInput = sut.getByTestId("password")
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })
    expect(validationSpy.fieldName).toBe("password")
    expect(validationSpy.fieldValue).toBe(password)
  })

  test("Should show email error if validation fails", () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    const emailInput = sut.getByTestId("email")
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId("email-status")
    expect(emailStatus.title).toBe(errorMessage)
    expect(emailStatus.textContent).toBe("🔴")
  })

  test("Should show passsword error if validation fails", () => {
    const errorMessage = faker.random.words()
    const { sut } = makeSut({ errorMessage })
    const passwordInput = sut.getByTestId("password")
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId("password-status")
    expect(passwordStatus.title).toBe(errorMessage)
    expect(passwordStatus.textContent).toBe("🔴")
  })

  test("Should show valid email state if validation succeeds", () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId("email")
    const email = faker.internet.email()

    fireEvent.input(emailInput, { target: { value: email } })
    const emailStatus = sut.getByTestId("email-status")
    expect(emailStatus.title).toBe("Tudo certo!")
    expect(emailStatus.textContent).toBe("🟢")
  })

  test("Should show valid password state if validation succeeds", () => {
    const { sut } = makeSut()
    const passwordInput = sut.getByTestId("password")
    const password = faker.internet.password()

    fireEvent.input(passwordInput, { target: { value: password } })
    const passwordStatus = sut.getByTestId("password-status")
    expect(passwordStatus.title).toBe("Tudo certo!")
    expect(passwordStatus.textContent).toBe("🟢")
  })

  test("Should enable submit button if login form is valid", () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId("email")
    const passwordInput = sut.getByTestId("password")
    const email = faker.internet.email()
    const password = faker.internet.password()
    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })

    const submitButton = sut.getByTestId("submit") as HTMLButtonElement
    expect(submitButton.disabled).toBe(false)
  })

  test("Should show spinner on submit", () => {
    const { sut } = makeSut()
    const emailInput = sut.getByTestId("email")
    const passwordInput = sut.getByTestId("password")
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement

    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId("spinner")
    expect(spinner).toBeTruthy()
  })

  test("Should call authentication with correct values", () => {
    const { sut, authenticationSpy } = makeSut()
    const emailInput = sut.getByTestId("email")
    const passwordInput = sut.getByTestId("password")
    const submitButton = sut.getByTestId("submit") as HTMLButtonElement

    const email = faker.internet.email()
    const password = faker.internet.password()

    fireEvent.input(emailInput, { target: { value: email } })
    fireEvent.input(passwordInput, { target: { value: password } })
    fireEvent.click(submitButton)

    const spinner = sut.getByTestId("spinner")
    expect(authenticationSpy.params).toEqual({
      email,
      password
    })
  })
})
