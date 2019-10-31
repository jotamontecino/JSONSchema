const jsonFactory = require("../lib");

const basicSchema = {
  type: "integer"
}
const basicSchemaToJson = {
  type: "integer",
  description:"",
  defaultValue:null,
  multipleOf:null,
  minimum:null,
  exclusiveMinimum:null,
  maximum:null,
  exclusiveMaximum:null,
}

////////////////////////////
const minimumInvalidFloatSchema = {
  type: "integer",
  description: "Standard schema with a validaton pattern",
  minimum: 1.2,
}
const strictMinimumInvalidValueSchema = {
  type: "integer",
  description: "Standard schema with a validaton pattern",
  minimum: 1,
  exclusiveMinimum: 0,
}

const inclusiveMinimumSchema = {
  type: "integer",
  description: "inclusiveMinimumSchema",
  minimum: 12,
}
const inclusiveMinimumSchemaToJSON = {
  type: "integer",
  description:"inclusiveMinimumSchema",
  defaultValue:null,
  multipleOf:null,
  minimum:12,
  exclusiveMinimum:null,
  maximum:null,
  exclusiveMaximum:null,
}
const inclusiveMinimumExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be integer"],
    value: "qsdf",
  },
  {
    title: "A value below the minimum should return an error",
    result: ["The integer value is below the defined minimum (12)"],
    value: 10,
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: 15,
  }
];

const exclusiveMinimumSchema = {
  type: "integer",
  description: "exclusiveMinimumSchema",
  minimum: 12,
  exclusiveMinimum: true,
}
const exclusiveMinimumSchemaToJSON = {
  type: "integer",
  description:"exclusiveMinimumSchema",
  defaultValue:null,
  multipleOf:null,
  minimum:12,
  exclusiveMinimum:true,
  maximum:null,
  exclusiveMaximum:null,
}
const exclusiveMinimumExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be integer"],
    value: "qsdf",
  },
  {
    title: "A value below the exclusive minimum shouldn't return an error",
    result: ["The integer value is below the defined strict minimum (12)"],
    value: 12,
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: 15,
  }
];


const maximumInvalidFloatSchema = {
  type: "integer",
  description: "Standard schema with a validaton pattern",
  minimum: 1.2,
}
const strictMaximumInvalidValueSchema = {
  type: "integer",
  description: "Standard schema with a validaton pattern",
  minimum: 1,
  exclusiveMinimum: 0,
}
const inclusiveMaximumSchema = {
  type: "integer",
  description: "inclusiveMaximumSchema",
  maximum: 12,
}
const inclusiveMaximumSchemaToJSON = {
  type: "integer",
  description:"inclusiveMaximumSchema",
  defaultValue:null,
  multipleOf:null,
  minimum:null,
  exclusiveMinimum:null,
  maximum:12,
  exclusiveMaximum:null,
}
const inclusiveMaximumExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be integer"],
    value: "qsdf",
  },
  {
    title: "A value above the maximum should return an error",
    result: ["The integer value is above the defined maximum (12)"],
    value: 13,
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: 12,
  }
];

const exclusiveMaximumSchema = {
  type: "integer",
  description: "exclusiveMinimumSchema",
  maximum: 12,
  exclusiveMaximum: true,
}
const exclusiveMaximumSchemaToJSON = {
  type: "integer",
  description:"exclusiveMinimumSchema",
  defaultValue:null,
  multipleOf:null,
  minimum:null,
  exclusiveMinimum:null,
  maximum:12,
  exclusiveMaximum:true,
}
const exclusiveMaximumExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be integer"],
    value: "qsdf",
  },
  {
    title: "A value above or equal to the maximum should return an error",
    result: ["The integer value is above the defined strict maximum (12)"],
    value: 12,
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: 10,
  }
];

const multipleOfInvalidSchema = {
  type: "integer",
  description: "Standard schema with a validaton pattern",
  multipleOf: true,
}
const multipleOfSchema = {
  type: "integer",
  description: "exclusiveMinimumSchema",
  multipleOf: 2.0,
}
const multipleOfSchemaToJSON = {
  type: "integer",
  description:"exclusiveMinimumSchema",
  defaultValue:null,
  multipleOf:2.0,
  minimum:null,
  exclusiveMinimum:null,
  maximum:null,
  exclusiveMaximum:null,
}
const multipleOfSchemaExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be integer"],
    value: "qsdf",
  },
  {
    title: "A value which isn't a multiple of *multipleOf* should return an error",
    result: ["The integer value should be a multiple of 2"],
    value: 13,
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: 10,
  },
];

describe("Basic Integer schema, should return the same schema", () => {
  test("The schema should compile and return a json schema", () => {
    const schema = jsonFactory(basicSchema);
    expect(schema.toString()).toBe(JSON.stringify(basicSchemaToJson));
  });
})

describe("Minimum and strictMinimum invalid property", () => {
  // const schema = jsonFactory(stringSchemaStdInvalid);
  function compileMinimum() {
    jsonFactory(minimumInvalidFloatSchema)
  }
  function compileStrictMinimum() {
    jsonFactory(strictMinimumInvalidValueSchema)
  }
  test("Invalid minimum value shouldn't compiled", () => {
    expect(compileMinimum).toThrow(/^Invalide schema definition for an Integer$/);
  });
  test("Invalid strictMinimum value shouldn't compiled", () => {
    expect(compileStrictMinimum).toThrow(/^Invalide schema definition for an Integer$/);
  });
})
describe("Inclusive Minimum validation", () => {
  const schema = jsonFactory(inclusiveMinimumSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(inclusiveMinimumSchemaToJSON));
  });
  inclusiveMinimumExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
describe("Exclusive Minimum validation", () => {
  const schema = jsonFactory(exclusiveMinimumSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(exclusiveMinimumSchemaToJSON));
  });
  exclusiveMinimumExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});


describe("Maximum and strictMaximum invalid property", () => {
  // const schema = jsonFactory(stringSchemaStdInvalid);
  function compileMaximum() {
    jsonFactory(maximumInvalidFloatSchema)
  }
  function compileStrictMaximum() {
    jsonFactory(strictMaximumInvalidValueSchema)
  }
  test("Invalid maximum value shouldn't compiled", () => {
    expect(compileMaximum).toThrow(/^Invalide schema definition for an Integer$/);
  });
  test("Invalid strictMaximum value shouldn't compiled", () => {
    expect(compileStrictMaximum).toThrow(/^Invalide schema definition for an Integer$/);
  });
})
describe("Inclusive Maximum validation", () => {
  const schema = jsonFactory(inclusiveMaximumSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(inclusiveMaximumSchemaToJSON));
  });
  inclusiveMaximumExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
describe("Exclusive Maximum validation", () => {
  const schema = jsonFactory(exclusiveMaximumSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(exclusiveMaximumSchemaToJSON));
  });
  exclusiveMaximumExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});

describe("MultipleOf invalid property", () => {
  // const schema = jsonFactory(stringSchemaStdInvalid);
  function compile() {
    jsonFactory(multipleOfInvalidSchema)
  }
  test("Invalid strictMaximum value shouldn't compiled", () => {
    expect(compile).toThrow(/^Invalide schema definition for an Integer$/);
  });
});
describe("MultipleOf validation", () => {
  const schema = jsonFactory(multipleOfSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(multipleOfSchemaToJSON));
  });
  multipleOfSchemaExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    });
  });
});
