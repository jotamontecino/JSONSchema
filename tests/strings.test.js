const jsonFactory = require("../lib");

const basicStringSchema = {
  type: "string"
}
const basicStringSchemaToJson = {
  type: "string",
  description:"",
  defaultValue:null,
  pattern:null,
  minLength:null,
  maxLength:null
}

////////////////////////////
const stringSchemaStdInvalid = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  pattern: /\d{12}/
}
const stringSchemaStd = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  pattern: "\\d{12}"
}
const stringSchemaStdToJson = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  defaultValue:null,
  pattern: "\\d{12}",
  minLength:null,
  maxLength:null
}
const stringSchemaStdExemples = [
  {
    title: "The pattern doesn't validate the value",
    result: ['String doesn\'t validate for the pattern "\\d{12}"'],
    value: "test"
  },
  {
    title: "Invalid type returns an error",
    result: ["Type should be string"],
    value: 1
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: "123456789012"
  }
];

////////////////////////////
const stringSchemaMinLengthInvalid = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  minLength: "12"
}
const stringSchemaMinLength = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  minLength: 10
}
const stringSchemaMinLengthToJson = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  defaultValue:null,
  pattern: null,
  minLength:10,
  maxLength:null
}
const stringSchemaMinLengthExemples = [
  {
    title: "The pattern doesn't validate the value",
    result: ['String should be at least "10" long.'],
    value: "test"
  },
  {
    title: "Invalid type returns an error",
    result: ["Type should be string"],
    value: 1
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: "123456789012"
  }
];

////////////////////////////
const stringSchemaMaxLengthInvalid = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  maxLength: "13"
}
const stringSchemaMaxLength = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  maxLength: 13
}
const stringSchemaMaxLengthToJson = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  defaultValue:null,
  pattern: null,
  minLength:null,
  maxLength:13
}
const stringSchemaMaxLengthExemples = [
  {
    title: "The pattern doesn't validate the value",
    result: ['String should be at most "13" long.'],
    value: "ceci est un test pour le max du string"
  },
  {
    title: "Invalid type returns an error",
    result: ["Type should be string"],
    value: 1
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: "123456789012"
  }
];

/////////////////////////////
const stringSchemaComplete = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  pattern: "^[a-zA-Z]+$",
  minLength: 8,
  maxLength: 20
}
const stringSchemaCompleteToJson = {
  type: "string",
  description: "Standard schema with a validaton pattern",
  defaultValue:null,
  pattern: "^[a-zA-Z]+$",
  minLength:8,
  maxLength:20
}
const stringSchemaCompleteExemples = [
  {
    title: "Invalid type returns an error",
    result: ["Type should be string"],
    value: 1
  },
  {
    title: "The pattern doesn't validate the value",
    result: ['String doesn\'t validate for the pattern "^[a-zA-Z]+$"'],
    value: "ceci est un test po"
  },
  {
    title: "The minLength is not reached for the value",
    result: ['String should be at least "8" long.'],
    value: "aaZa"
  },
  {
    title: "The minLength is not reached for the value and the pattern doesn't validate the value",
    result: ['String should be at least "8" long.', 'String doesn\'t validate for the pattern "^[a-zA-Z]+$"'],
    value: "aa 2Za"
  },
  {
    title: "The value length is above the maxLength",
    result: ['String should be at most "20" long.'],
    value: "AZERTYytrezaRtyudZerR"
  },
  {
    title: "The value length is above the maxLength and the pattern doesn't validate the value",
    result: ['String should be at most "20" long.', 'String doesn\'t validate for the pattern "^[a-zA-Z]+$"'],
    value: "AZER TYytreza1 2RtyudZerR"
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: "AzerZerZAr"
  }
];

describe('Basic String schema, should return the same schema', () => {
  test('Does the schema compile and return a valide json schema', () => {
    const schema = jsonFactory(basicStringSchema);
    expect(schema.toString()).toBe(JSON.stringify(basicStringSchemaToJson));
  });
})

describe('Standard string schema with a regex type pattern shouldn\'t compile', () => {
  // const schema = jsonFactory(stringSchemaStdInvalid);
  function compile() {
    jsonFactory(stringSchemaStdInvalid)
  }
  test('The schema shouldn\'t compiled', () => {
    expect(compile).toThrow(/^Invalide schema definition for a String$/);
  });
})
describe('standard string schema with a simple pattern', () => {
  const schema = jsonFactory(stringSchemaStd);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(stringSchemaStdToJson));
  });
  stringSchemaStdExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
})

describe('Standard string schema with a string minLength shouldn\'t compile', () => {
  // const schema = jsonFactory(stringSchemaStdInvalid);
  function compile() {
    jsonFactory(stringSchemaMinLengthInvalid)
  }
  test('The schema shouldn\'t compiled', () => {
    expect(compile).toThrow(/^Invalide schema definition for a String$/);
  });
})
describe('standard string schema with a minLength', () => {
  const schema = jsonFactory(stringSchemaMinLength);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(stringSchemaMinLengthToJson));
  });
  stringSchemaMinLengthExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
})

describe('Standard string schema with a string maxLength shouldn\'t compile', () => {
  // const schema = jsonFactory(stringSchemaStdInvalid);
  function compile() {
    jsonFactory(stringSchemaMaxLengthInvalid)
  }
  test('The schema shouldn\'t compiled', () => {
    expect(compile).toThrow(/^Invalide schema definition for a String$/);
  });
})
describe('standard string schema with a maxLength', () => {
  const schema = jsonFactory(stringSchemaMaxLength);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(stringSchemaMaxLengthToJson));
  });
  stringSchemaMaxLengthExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
})

describe('complete string schema', () => {
  const schema = jsonFactory(stringSchemaComplete);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(stringSchemaCompleteToJson));
  });
  stringSchemaCompleteExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
})
