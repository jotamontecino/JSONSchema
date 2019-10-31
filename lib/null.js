const JSONType = require("./jsonType");

class JSONNull extends JSONType {
  constructor({
    type,
    description,
    defaultValue,
  }) {
    super();
    if (
      type === "null"
    ) {
      this.description = description || "";
      this.defaultValue = null;
      this.validate = this.createValidationFunction();
      return;
    }
    throw new Error ("Invalide schema definition for a Null")
  }
  toJSON() {
    return {
      type: "null",
      description: this.description,
      defaultValue: this.defaultValue,
    }
  }
  createValidationFunction() {
      return function (val) {
        if (val === null) {
          return false;
        } else {
          return ["Type should be null"];
        }
      };
  }
}
module.exports = JSONNull;
