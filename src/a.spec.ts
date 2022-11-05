class Adder {
  add_1_to(first_number: number): number {
    return first_number + 1;
  }
}

describe('Add numbers to other', () => {
  test('add 1 to a number', () => {
    const adder = new Adder()
    var number = 0
    expect(adder.add_1_to(number)).toBe(1)
  })
})
