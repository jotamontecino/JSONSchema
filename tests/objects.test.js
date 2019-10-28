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
const simpleSchemaToJson = {
  type: 'object',
  properties: {
    text: {
      type: 'string',
      description: '',
      defaultValue: null,
      pattern: "^[a-zA-Z0-9 ]+$",
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
    result: ["The type should be Object"],
    value: 9
  },
  {
    title: "Invalid prop inside the body",
    result: [{
      "errors": [
        "String doesn't validate for the pattern \"^[a-zA-Z0-9 ]+$\"",
      ],
      "path": "text",
    }],
    value: {
      text: "j'ai Sauté",
      int: 9
    }
  },
  {
    title: "Multiple errors inside one prop",
    result: [{
      "errors": [
        "String should be at most \"20\" long.",
        "String doesn't validate for the pattern \"^[a-zA-Z0-9 ]+$\"",
      ],
      "path": "text",
    }],
    value: {
      text: "j'ai Sauté 12345678900987654321",
      int: 9
    }
  },
  {
    title: "Multiple errors inside multiple props",
    result: [ {
        path: 'text',
        errors: [ 'String should be at most "20" long.',
           'String doesn\'t validate for the pattern "^[a-zA-Z0-9 ]+$"' ]
      },
      {
        path: 'int',
        errors: [ 'The integer value is below the defined strict minimum (8)' ]
      }
    ],
    value: {
      text: "j'ai Sauté 12345678900987654321",
      int: 8
    }
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: {
      text: "jai Sautzq0 9",
      int: 12
    }
  }
];

const complexeSchema = {
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
      }
    }
  },
  required: ["text"]
}

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
  simpleExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
