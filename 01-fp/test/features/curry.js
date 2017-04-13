import * as curry from '../../src/features/curry'

export default function() {
    it('should add up two numbers', () => {
      curry.addUp(10)(32).should.eql(42)
    })

    it('should subtract', () => {
      curry.subtract(52)(10).should.eql(42)
    })

    it('should multiply two numbers', () => {
      curry.multiply(21)(2).should.eql(42)
    })

    it('should divide two numbers', () => {
      curry.divide(84)(2).should.eql(42)
    })
}
