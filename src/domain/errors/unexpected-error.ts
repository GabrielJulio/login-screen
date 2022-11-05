export class UnexpectedError extends Error {
  constructor () {
    super('Aconteceu algo errado. Tente novamente mais tarde.')
    this.name = 'UnexpectedError'
  }
}
