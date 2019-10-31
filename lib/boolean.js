const JSONType = require("./jsonType");

class JSONBoolean extends JSONType {
  constructor({
    type,
    description,
    defaultValue,
  }) {
    super();
    if (
      type === "boolean" &&
      (!defaultValue || typeof defaultValue === "boolean" )
    ) {
      this.description = description || "";
      this.defaultValue = defaultValue || null;
      this.validate = this.createValidationFunction();
      return;
    }
    throw new Error ("Invalide schema definition for an Boolean");
  }
  toJSON() {
    return {
      type: "boolean",
      description: this.description,
      defaultValue: this.defaultValue,
    };
  }
  createValidationFunction() {
      return function (int) {
        if (typeof int === "boolean") {
          return false;
        } else {
          return ["Type should be boolean"];
        }
      };
  }
}
module.exports = JSONBoolean;
