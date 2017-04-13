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

    // it('should multiply all numbers', () => {
    //   hof.calculate(hof.double,[2,3]).to.include.members([4, 6])
    // })
}


// export default function() {
//   it('should emulate Map/Set behavior in ES5', () => {
//     var klasses = es5()
//     var mySet = new klasses.MySet()
//     mySet
//       .add(1)
//       .add(2)
//       .add(3)
//
//     mySet.has(1).should.be.true
//     mySet.has(2).should.be.true
//     mySet.has(3).should.be.true
//     mySet.has(4).should.be.true
//
//     var myMap = new klasses.MyMap()
//     myMap.set('Hello', 'World!')
//     myMap.set('second', 2);
//     (function() {
//       myMap.set(1, 2)
//     }).should.throw()
//     myMap.get('Hello').should.eql('World!')
//     myMap.get('second').should.eql(2)
//   })
//
//   it('should show Map/Set behavior in ES6', () => {
//     let mySet = new Set()
//
//     mySet
//       .add(1)
//       .add(2)
//       .add(3)
//
//     mySet.has(1).should.be.true
//     mySet.has(2).should.be.true
//     mySet.has(3).should.be.true
//     mySet.has(4).should.be.false
//
//     let myMap = new Map()
//     myMap.set('Hello', 'World!');
//     myMap.set('second', 2);
//
//     (function(){
//       myMap.set(1, 2)
//     }).should.not.throw()
//
//     myMap.get('Hello').should.eql('World!')
//     myMap.get('second').should.eql(2)
//   })
// }
