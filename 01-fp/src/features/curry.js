const addUp = (valueOne) => {
  return (valueTwo) => {
    return valueOne + valueTwo
  }
}

const subtract = (valueOne) => {
  return (valueTwo) => {
    return valueOne - valueTwo
  }
}

const multiply = (valueOne) => {
  return (valueTwo) => {
    return valueOne * valueTwo
  }
}

const divide = (valueOne) => {
  return (valueTwo) => {
    return valueOne / valueTwo
  }
}

export {
  addUp,
  subtract,
  multiply,
  divide
};
