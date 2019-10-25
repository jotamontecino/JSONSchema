//
// // Factory to create a semVer from a string
// function semverFromStr(string) {
//   if (/\d+\.\d+.\d+$/.test(string)) {
//     const matchs= string.split(".")
//     return new SemVer(matchs[0], matchs[1], matchs[2])
//   }
// }
// // Creates a version Object
// class SemVer {
//   constructor(major, minor, fix) {
//     if (typeof major === "string" &&
//         typeof minor === "string" &&
//         typeof fix === "string" )
//     {
//       this.major = major;
//       this.minor = minor;
//       this.fix = fix;
//     } else {
//       throw new Error ("Caca bis version")
//     }
//   }
//   getMaj() {
//     return this.major;
//   }
//   getMin() {
//     return this.minor;
//   }
//   getFix() {
//     return this.fix;
//   }
// }
//
// class ObjectSchema {
//   constructor(semver, JSONSchema) {
//     this.semver = semver;
//     this.schema = JSONFactory(JSONSchema);
//   }
// }


const JSONType = require("./jsonType");;
const JSONString = require("./string");
const JSONInteger = require("./integer");
const JSONBoolean = require("./boolean");
const JSONNull = require("./null");

class PlainObject extends JSONType {
  constructor({type, description, required, properties, additionalProperties}) {
    super();
    if (type === "object") {
      this.description = description || "";
      this.additionalProperties = additionalProperties || true;
      this.properties = {};
      this.setRequired(required);
      this.processProperties(properties);
      return;
    }
    throw new Error ("Invalide schema definition for an Object")
  }
  processProperties(properties) {
    if (Object.keys(properties).length > 0) {
      Object.keys(properties)
      .forEach((key) => {
        this.addProperty(key, properties[key]);
      })
    }
  }
  addProperty(key, schema) {
    if (schema.type) {
      switch(schema.type) {
        case "object": this.properties[key] = new PlainObject(schema); break;
        case "string": this.properties[key] = new JSONString(schema); break;
        case "boolean": this.properties[key] = new JSONBoolean(schema); break;
        case "integer": this.properties[key] = new JSONInteger(schema); break;
        case "null": this.properties[key] = new JSONNull(schema); break;
      }
      return;
    }
    throw new Error("Undefined type");
  }

  // Set the field required if all values are Strings.
  setRequired(required) {
    if (Array.isArray(required) && required.length > 0) {
      const flag = required.filter((item) => typeof item === "string").length;
      if (required.length === flag) {
        this.required = required;
        return;
      }
      throw new Error("Required property name type unsupported")
    }
    this.required = null;
    return;
  }
  toJSON() {
    return {
      type: "object",
      properties: Object.keys(this.properties)
        .map((key) => { return {[key]: this.properties[key].toJSON()}})
        .reduce((acc, props) => {return Object.assign(acc, props)}, {}),
      required: this.required,

    }
  }
}


module.exports = {
  // semverFromStr,
  // SemVer,
  // ObjectSchema,
  PlainObject,
};
