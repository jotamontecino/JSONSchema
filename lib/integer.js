const JSONType = require("./jsonType");

class JSONInteger extends JSONType {
  constructor({
    type,
    description,
    defaultValue,
    multipleOf,
    minimum,
    exclusiveMinimum,
    maximum,
    exclusiveMaximum,
  }) {
    super();
    if (
      type === "integer" &&
      (!defaultValue || Number.isInteger(defaultValue)) &&
      (!multipleOf || Number.isInteger(multipleOf)) &&
      (!minimum || Number.isInteger(minimum)) &&
      ((!exclusiveMinimum && !Number.isInteger(exclusiveMinimum)) || typeof exclusiveMinimum === "boolean") &&
      (!maximum || Number.isInteger(maximum)) &&
      ((!exclusiveMaximum && !Number.isInteger(exclusiveMaximum)) || typeof exclusiveMaximum === "boolean")
    ) {
      this.description = description || "";
      this.defaultValue = defaultValue || null;
      this.multipleOf = multipleOf || null;
      this.minimum = minimum || null;
      this.exclusiveMinimum = exclusiveMinimum || null;
      this.maximum = maximum || null;
      this.exclusiveMaximum = exclusiveMaximum || null;
      this.validate = this.createValidationFunction();
      return;
    }
    throw new Error ("Invalide schema definition for an Integer");
  }
  toJSON() {
    return {
      type: "integer",
      description: this.description,
      defaultValue: this.defaultValue,
      multipleOf: this.multipleOf,
      minimum: this.minimum,
      exclusiveMinimum: this.exclusiveMinimum,
      maximum: this.maximum,
      exclusiveMaximum: this.exclusiveMaximum,
    }
  }
  createValidationFunction() {
      const validationFnList = [];
      if (this.minimum) {
        const minimum = this.minimum
        const exclusiveMinimum = this.exclusiveMinimum
        let fn = function (int) { return int >= minimum };
        if (this.exclusiveMinimum) {
          fn = function (int) { return int > minimum };
        }
        validationFnList.push(function(int) {
          if (fn(int)) {
            return true;
          }
          return `The integer value is below the defined ${(exclusiveMinimum)?'strict ':''}minimum (${minimum})`
        });
      }
      if (this.maximum) {
        const maximum = this.maximum
        const exclusiveMaximum = this.exclusiveMaximum
        let fn = function (int) { return int <= maximum };
        if (this.exclusiveMaximum) {
          fn = function (int) { return int < maximum };
        }
        validationFnList.push(function(int) {
          if (fn(int)) {
            return true;
          }
          return `The integer value is above the defined ${(exclusiveMaximum)?'strict ':''}maximum (${maximum})`
        });
      }
      if (this.multipleOf) {
        const multipleOf = this.multipleOf;
        validationFnList.push(function(int) {
          if ((int % multipleOf) === 0) {
            return true;
          }
          return `The integer value should be a multiple of ${multipleOf}`
        })
      }
      return function (int) {
        if (Number.isInteger(int)) {
          return validationFnList.map(function(fn) {
            return fn(int);
          })
          .reduce(function(acc, result, index, tab) {
            if (typeof result === "string") {
              acc.push(result);
            }
            if (index + 1 === tab.length && acc.length === 0) {
              return false;
            }
            return acc;
          }, [])
        } else {
          return ["Type should be integer"];
        }

      }
  }
}
module.exports = JSONInteger;
