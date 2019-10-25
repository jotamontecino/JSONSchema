const JSONFactory = require("../lib");

const basicSchema = {
  type: "object",
  properties: {
    text: {
      type: "string"
    },
    int: {
      type: "integer"
    }
  }
}
const basicSchemaToJson = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: '',
      defaultValue: null,
      pattern: null,
      minLength: null,
      maxLength: null
    },
    int: {
      type: 'integer',
      description: '',
      defaultValue: null,
      multipleOf: null,
      minimum: null,
      exclusiveMinimum: null,
      maximum: null,
      exclusiveMaximum: null
    }
  },
  required: null
}

/////////////////////////////////////
const simpleSchema = {
  type: "object",
  properties: {
    text: {
      type: "string",
      pattern: "[a-zA-Z0-9 ]+",
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
const simpleSchemaToJson = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: '',
      defaultValue: null,
      pattern: "[a-zA-Z0-9 ]+",
      minLength: 5,
      maxLength: 20
    },
    int: {
      type: 'integer',
      description: '',
      defaultValue: null,
      multipleOf: null,
      minimum: 8,
      exclusiveMinimum: true,
      maximum: 20,
      exclusiveMaximum: true
    }
  },
  required: null
}
const simpleExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be boolean"],
    value: 0
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: true
  }
];

describe('Object validation', () => {
  const schema = JSONFactory(basicSchema);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(basicSchemaToJson));
  });
});
describe('simple Object validation', () => {
  const schema = JSONFactory(simpleSchema);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(simpleSchemaToJson));
  });
  // basicExemples.forEach((testItem) => {
  //   test(testItem.title, () => {
  //     expect(schema.validate(testItem.value)).toEqual(testItem.result);
  //   })
  // });
});
