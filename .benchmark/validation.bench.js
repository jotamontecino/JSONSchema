const JSONFactory = require("../lib");

const simpleJSONSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      pattern: "^[a-zA-Z0-9 ]+$",
      minLength: 5,
      maxLength: 20
    },
    int: {
      type: "integer",
      minimum: 8,
      exclusiveMinimum: true,
      maximum: 20,
      exclusiveMaximum: true,
    }
  }
}
const simpleJSON = {
  text: "jai Sautzq0 9",
  int: 12,
  nouveauChamps: true
};
const simpleSchema = JSONFactory(simpleJSONSchema);


const nestedJSONSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      pattern: "^[a-zA-Z0-9 ]+$",
      minLength: 5,
      maxLength: 20
    },
    int: {
      type: "integer",
      minimum: 8,
      exclusiveMinimum: true,
      maximum: 20,
      exclusiveMaximum: true,
    },
    bool: {
      type: "boolean"
    },
    address: {
      type: "object",
      properties: {
        city: {
          type: "string"
        },
        country: {
          type: "string"
        }
      },
      required: ["city", "country"]
    },
    obj: {
      type: "object",
      properties: {}
    }
  },
  additionalProperties: false,
  required: ["text", "address"]
};
const nestedJSON = {
  title: "Valid JSON doesn't return error",
  result: false,
  value: {
    text: "90867ET",
    address: {
      city : "Ville",
      country: "Pays"
    }
  }
};
const nestedSchema = JSONFactory(nestedJSONSchema);

bench(
  [
    function simpleJSON() {
      simpleSchema.validate(simpleJSON);
    },
    function simpleJSON() {
      nestedSchema.validate(nestedJSON);
    },
  ],
  { runs: 10000 }
);
