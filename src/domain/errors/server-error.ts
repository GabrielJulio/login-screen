export class ServerError extends Error {
  constructor () {
    super("Processamos algo erado, por favor tente novamente mais tarde.")
    this.name = "ServerError"
  }
}
