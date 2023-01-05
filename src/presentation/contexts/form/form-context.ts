import { createContext } from "react"

export type StateProps = {
  isLoading: boolean
  errorMessage: string
}

export default createContext<StateProps>({} as StateProps)
