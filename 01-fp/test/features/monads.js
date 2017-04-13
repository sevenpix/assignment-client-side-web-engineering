import monads from '../../src/features/monads'

export default function() {

    it('should add up the numbers', () => {
      let calculator = monads(35)
      calculator
        .addUp(4)
        .addUp(2)
        .addUp(1)
      calculator.result.should.eql(42)
    })

    it('should subtract the numbers', () => {
      let calculator = monads(126)
      calculator
        .subtract(40)
        .subtract(30)
        .subtract(14)
      calculator.result.should.eql(42)
    })

    it('should subtract the numbers', () => {
      let calculator = monads(7)
      calculator
        .multiply(3)
        .multiply(2)
      calculator.result.should.eql(42)
    })
}
