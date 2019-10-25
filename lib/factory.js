const JSONSchema = require("./object");

const JSONString = require("./string");
const JSONInteger = require("./integer");
const JSONBoolean = require("./boolean");
const JSONNull = require("./null");


function JSONFactory(schema) {
  if (schema.type) {
    switch(schema.type) {
      case "object": return new JSONSchema.PlainObject(schema);
      case "string": return new JSONString(schema);
      case "boolean": return new JSONBoolean(schema);
      case "integer": return new JSONInteger(schema);
      case "null": return new JSONNull(schema);
    }
  }
  throw new Error("Undefined type");
}
