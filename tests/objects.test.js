const jsonFactory = require("../lib");

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
  type: "object",
  description:"",
  properties: {
    text: {
      type: "string",
      description: "",
      defaultValue: null,
      pattern: null,
      minLength: null,
      maxLength: null
    },
    int: {
      type: "integer",
      description: "",
      defaultValue: null,
      multipleOf: null,
      minimum: null,
      exclusiveMinimum: null,
      maximum: null,
      exclusiveMaximum: null
    }
  },
  additionalProperties:true,
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
  type: "object",
  description:"",
  properties: {
    text: {
      type: "string",
      description: "",
      defaultValue: null,
      pattern: "^[a-zA-Z0-9 ]+$",
      minLength: 5,
      maxLength: 20
    },
    int: {
      type: "integer",
      description: "",
      defaultValue: null,
      multipleOf: null,
      minimum: 8,
      exclusiveMinimum: true,
      maximum: 20,
      exclusiveMaximum: true
    }
  },
  additionalProperties:true,
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
        path: "text",
        errors: [ "String should be at most \"20\" long.",
           "String doesn't validate for the pattern \"^[a-zA-Z0-9 ]+$\"" ]
      },
      {
        path: "int",
        errors: [ "The integer value is below the defined strict minimum (8)" ]
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
      int: 12,
      nouveauChamps: true
    }
  }
];
/////////////////////////////////////
const complexeSchema = {
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
      }
    },
    obj: {
      type: "object",
      properties: {}
    }
  },
  additionalProperties: false,
  required: ["text", "int"]
};
const complexeSchemaToJSON = {
   "type":"object",
   "description":"",
   "properties":{
      "text":{
         "type":"string",
         "description":"",
         "defaultValue":null,
         "pattern":"^[a-zA-Z0-9 ]+$",
         "minLength":5,
         "maxLength":20
      },
      "int":{
         "type":"integer",
         "description":"",
         "defaultValue":null,
         "multipleOf":null,
         "minimum":8,
         "exclusiveMinimum":true,
         "maximum":20,
         "exclusiveMaximum":true
      },
      "bool":{
         "type":"boolean",
         "description":"",
         "defaultValue":null
      },
      "address":{
         "type":"object",
         "description":"",
         "properties":{
            "city":{
               "type":"string",
               "description":"",
               "defaultValue":null,
               "pattern":null,
               "minLength":null,
               "maxLength":null
            },
            "country":{
               "type":"string",
               "description":"",
               "defaultValue":null,
               "pattern":null,
               "minLength":null,
               "maxLength":null
            }
         },
         "additionalProperties":true,
         "required":null
      },
      "obj":{
         "type":"object",
         "description":"",
         "properties":{

         },
         "additionalProperties":true,
         "required":null
      }
   },
   "additionalProperties":false,
   "required":[
      "text", "int"
   ]
}
const complexeExemples = [
  {
    title: "Required props not defined",
    result: ["The property text is required but not found."],
    value: {
      int: 9
    }
  },
  {
    title: "Additional property not allowed",
    result: ["The property tutu isn't allowed by the schema."],
    value: {
      text: "90867ET",
      int: 9,
      tutu: true
    }
  },
  {
    title: "Required props with allowed values doesn't return an error",
    result: false,
    value: {
      text: "90867ET",
      int: 9
    }
  },
];

/////////////////////////////////////
const nestedchema = {
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
const nestedSchemaToJSON = {
   "type":"object",
   "description":"",
   "properties":{
      "text":{
         "type":"string",
         "description":"",
         "defaultValue":null,
         "pattern":"^[a-zA-Z0-9 ]+$",
         "minLength":5,
         "maxLength":20
      },
      "int":{
         "type":"integer",
         "description":"",
         "defaultValue":null,
         "multipleOf":null,
         "minimum":8,
         "exclusiveMinimum":true,
         "maximum":20,
         "exclusiveMaximum":true
      },
      "bool":{
         "type":"boolean",
         "description":"",
         "defaultValue":null
      },
      "address":{
         "type":"object",
         "description":"",
         "properties":{
            "city":{
               "type":"string",
               "description":"",
               "defaultValue":null,
               "pattern":null,
               "minLength":null,
               "maxLength":null
            },
            "country":{
               "type":"string",
               "description":"",
               "defaultValue":null,
               "pattern":null,
               "minLength":null,
               "maxLength":null
            },
         },
         "additionalProperties":true,
         required: ["city", "country"],
      },
      "obj":{
         "type":"object",
         "description":"",
         "properties":{

         },
         "additionalProperties":true,
         "required":null
      }
   },
   "additionalProperties":false,
   "required":[
      "text", "address"
   ]
}
const nestedExemples = [
  {
    title: "Nested Object without the required properties",
    result: [{
      "errors": [
        "The property country is required but not found.",
      ],
      "path": "address",
    }],
    value: {
      text: "3OSNDHFIQK",
      address: {
        city : "Ville"
      }
    }
  },
  {
    title: "Bad type for a nested property return an error",
    result: [{"errors": [{"errors": ["Type should be string"], "path": "country"}], "path": "address"}],
    value: {
      text: "90867ET",
      address: {
        city : "Ville",
        country: 9
      }
    }
  },
  {
    title: "Valid JSON doesn't return error",
    result: false,
    value: {
      text: "90867ET",
      address: {
        city : "Ville",
        country: "Pays"
      }
    }
  },
];


describe("Object validation", () => {
  const schema = jsonFactory(basicSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(basicSchemaToJson));
  });
});

describe("simple Object validation", () => {
  const schema = jsonFactory(simpleSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(simpleSchemaToJson));
  });
  simpleExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
describe("complexe Object validation", () => {
  const schema = jsonFactory(complexeSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(complexeSchemaToJSON));
  });
  complexeExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
describe("nested Objects validation", () => {
  const schema = jsonFactory(nestedchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(nestedSchemaToJSON));
  });
  nestedExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
