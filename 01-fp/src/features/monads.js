const calculator = (input) => {

  let result

  const addUp = function (value) {
    input += value;
    this.result = input;
    return this;
  }

  const subtract = function (value) {
    input -= value;
    this.result = input;
    return this;
  }

  const multiply = function (value) {
    input *= value;
    this.result = input;
    return this;
  }

  return {
    addUp,
    subtract,
    multiply,
    result
  }
}

export default calculator
