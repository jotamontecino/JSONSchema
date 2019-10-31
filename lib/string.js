const JSONType = require("./jsonType");


class JSONString extends JSONType {
  constructor({type, description, defaultValue, pattern, minLength, maxLength}) {
    super();
    if (type === "string" &&
      (!pattern || typeof pattern === "string" ) &&
      (!minLength || Number.isInteger(minLength)) &&
      (!maxLength || Number.isInteger(maxLength))
    ) {
      this.description = description || "";
      this.defaultValue = defaultValue || null;
      this.pattern = pattern || null;
      this.minLength = minLength || null;
      this.maxLength = maxLength || null;
      this.validate = this.createValidationFunction();
      return;
    }
    throw new Error ("Invalide schema definition for a String");
  }
  toJSON() {
    return {
      type: "string",
      description: this.description,
      defaultValue: this.defaultValue,
      pattern: this.pattern,
      minLength: this.minLength,
      maxLength: this.maxLength,
    };
  }
  createValidationFunction() {
    const validationFnList = [];
    if (this.minLength) {
      const minLength = this.minLength;
      validationFnList.push(
        function (str) {
          if (str.length > minLength) {
            return true;
          }
          return `String should be at least "${minLength}" long.`;
        }
      );
    }
    if (this.maxLength) {
      const maxLength = this.maxLength;
      validationFnList.push(
        function (str) {
          if (str.length < maxLength) {
            return true;
          }
          return `String should be at most "${maxLength}" long.`;
        }
      );
    }
    if (this.pattern) {
      const regexp = new RegExp(this.pattern);
      const pattern = this.pattern;
      validationFnList.push(
        function (str) {
          if (!regexp.test(str)) {
            return `String doesn't validate for the pattern "${pattern}"`;
          }
          return true;
        }
      );
    }
    return function (str) {
      if (typeof str === "string") {
        if (validationFnList.length > 0) {
          return validationFnList.map(function(fn) {
            return fn(str);
          })
            .reduce(function(acc, result, index, tab) {
              if (typeof result === "string") {
                acc.push(result);
              }
              if (index + 1 === tab.length && acc.length === 0) {
                return false;
              }
              return acc;
            }, []);
        }
        return false;
      } else {
        return ["Type should be string"];
      }
    };
  }
}

module.exports = JSONString;
