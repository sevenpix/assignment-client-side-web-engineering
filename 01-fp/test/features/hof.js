import * as hof from '../../src/features/hof'

export default function() {
    it('should add up all numbers', () => {
      hof.calculate(hof.addUp,10,20,12).should.eql(42)
    })

    it('should subtract all numbers', () => {
      hof.calculate(hof.subtract,100,50,8).should.eql(42)
    })

    it('should multiply all numbers', () => {
      hof.calculate(hof.multiply,1,21,2).should.eql(42)
    })
}
