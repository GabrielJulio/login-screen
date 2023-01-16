import React, { useState, useEffect } from "react"
import Styles from "./login-styles.scss"
import {
  Input,
  Footer,
  FormStatus,
  LoginHeader
} from "@/presentation/components"
import Context from "@/presentation/contexts/form/form-context"
import { Validation } from "@/presentation/protocols"
import { Authentication, AuthenticationParams } from "@/domain/usecases"

type Props = {
  validation: Validation
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const [state, setState] = useState({
    isLoading: false,
    email: "",
    password: "",
    emailError: "Campo obrigatório",
    passwordError: "Campo obrigatório",
    mainError: ""
  })

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      emailError: validation.validate("email", state.email)
    }))
  }, [state.email])

  useEffect(() => {
    setState(oldState => ({
      ...oldState,
      passwordError: validation.validate("password", state.password)
    }))
  }, [state.password])

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    event.preventDefault()
    setState(oldState => ({ ...oldState, isLoading: true }))
    const authenticationParams: AuthenticationParams = {
      email: state.email,
      password: state.password
    }
    await authentication.auth(authenticationParams)
  }

  return <div className={Styles.login}>
    <LoginHeader />
    <Context.Provider value={{ state, setState }}>
      <form className={ Styles.form } onSubmit={ handleSubmit }>
        <h2>Login</h2>
        <Input type="email" name="email" placeholder="Digite seu e-mail" />
        <Input type="password" name="password" placeholder="Digite sua senha" />
        <button
          data-testid="submit" className={ Styles.submit }
          disabled={ !!state.emailError || !!state.passwordError }
          type="submit"
        >
          Entrar
        </button>
        <span className={Styles.link}>
          Criar conta
        </span>
        <FormStatus />
      </form>
    </Context.Provider>
    <Footer />
  </div>
}

export default Login
