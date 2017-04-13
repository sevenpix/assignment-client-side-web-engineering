const calculate = (func, ...values) => {
  return func(values)
}

const addUp = (values) => {
  return values.reduce((acc, val) => acc + val)
}

const subtract = (values) => {
  return values.reduce((acc, val) => acc - val)
}

const multiply = (values) => {
  return values.reduce((acc, val) => acc * val)
}

const double = (values) => {
  return values.map((acc) => acc * 2)
}

const isLower = (values) => {
  return
}

export {
  calculate,
  addUp,
  subtract,
  multiply,
  double
};