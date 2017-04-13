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

const divide = (values) => {
  return values.reduce((acc, val) => acc / val)
}

export {
  calculate,
  addUp,
  subtract,
  multiply,
  divide
};
