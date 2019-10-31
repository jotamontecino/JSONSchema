const jsonFactory = require("../lib");

const basicSchema = {
  type: "null"
};
const basicSchemaToJson = {
  type: "null",
  description:"",
  defaultValue:null,
};
const basicExemples = [
  {
    title: "Invalid type return an error",
    result: ["Type should be null"],
    value: 0,
  },
  {
    title: "A good value shouldn't return errors",
    result: false,
    value: null,
  },
];

describe("Null validation", () => {
  const schema = jsonFactory(basicSchema);
  test("The schema is compiled", () => {
    expect(schema.toString()).toBe(JSON.stringify(basicSchemaToJson));
  });
  basicExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
