const JSONFactory = require("../lib");

const basicSchema = {
  type: "boolean"
}
const basicSchemaToJson = {
  type: "boolean",
  description:"",
  defaultValue:null,
}
const basicExemples = [
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

describe('Boolean validation', () => {
  const schema = JSONFactory(basicSchema);
  test('The schema is compiled', () => {
    expect(schema.toString()).toBe(JSON.stringify(basicSchemaToJson));
  });
  basicExemples.forEach((testItem) => {
    test(testItem.title, () => {
      expect(schema.validate(testItem.value)).toEqual(testItem.result);
    })
  });
});
