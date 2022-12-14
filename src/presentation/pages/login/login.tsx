import React, { useState } from "react"
import Styles from "./login-styles.scss"
import {
  Input,
  Footer,
  FormStatus,
  LoginHeader
} from "@/presentation/components"
import Context, { StateProps } from "@/presentation/contexts/form/form-context"

const Login: React.FC = () => {
  const [state] = useState<StateProps>({
    isLoading: false,
    errorMessage: ""
  })

  return <div className={Styles.login}>
    <LoginHeader />
      <Context.Provider value={state}>
        <form className={Styles.form}>
          <h2>Login</h2>
          <Input type="email" name="email" placeholder="Digite seu e-mail"/>
          <Input type="password" name="password" placeholder="Digite sua senha"/>
          <button className={Styles.submit} type="submit">Entrar</button>
          <span className={Styles.link}>Criar conta</span>
          <FormStatus />
        </form>
      </Context.Provider>
    <Footer />
  </div>
}

export default Login
