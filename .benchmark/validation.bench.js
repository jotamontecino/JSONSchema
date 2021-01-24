const JSONFactory = require("../lib");
const Ajv = require("ajv").default;
const ajv = new Ajv() // options can be passed, e.g. {allErrors: true}

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
      exclusiveMinimum: 8,
      exclusiveMaximum: 20,
    }
  }
}
const simpleJSON = {
  text: "jai Sautzq0 9",
  int: 12,
  nouveauChamps: true
};
const simpleSchema = JSONFactory(simpleJSONSchema);

const ajvSimpleSchema = ajv.compile(simpleJSONSchema)


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
      exclusiveMinimum: 8,
      exclusiveMaximum: 20,
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
    bool: false,
    int:12,
    address: {
      city : "Ville",
      country: "Pays"
    }
  }
};
const nestedSchema = JSONFactory(nestedJSONSchema);
const ajvNestedSchema = ajv.compile(nestedJSONSchema)

bench(
  [
    function simpleJSON() {
      simpleSchema.validate(simpleJSON);
    },
    function nestedJSON() {
      nestedSchema.validate(nestedJSON);
    },
    function AJVsimpleJSON() {
      ajvSimpleSchema(simpleJSON);
    },
    function AJVNestedJSON() {
      ajvNestedSchema(nestedJSON);
    },
  ],
  { runs: 10000 }
);
