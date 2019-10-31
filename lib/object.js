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


const JSONType = require("./jsonType");
const JSONString = require("./string");
const JSONInteger = require("./integer");
const JSONBoolean = require("./boolean");
const JSONNull = require("./null");

class PlainObject extends JSONType {
  constructor({type, description, required, properties, additionalProperties}) {
    super();
    if (
      type === "object" &&
      (typeof properties === "object" && !Array.isArray(properties)) &&
      (!required || Array.isArray(required)) &&
      (!description || typeof description === "string") &&
      ((!additionalProperties && typeof additionalProperties !== "number") || typeof additionalProperties === "boolean")
    ) {
      this.description = description || "";
      this.additionalProperties = (typeof additionalProperties === "boolean") ? additionalProperties : additionalProperties || true;
      this.properties = {};
      this.setRequired(required);
      this.processProperties(properties);
      this.validate = this.createValidationFunction();
      return;
    }
    throw new Error ("Invalide schema definition for an Object");
  }
  processProperties(properties) {
    if (properties && Object.keys(properties).length > 0) {
      Object.keys(properties)
        .forEach((key) => {
          this.addProperty(key, properties[key]);
        });
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
      throw new Error("Required property name type unsupported");
    }
    this.required = null;
    return;
  }
  toJSON() {
    return {
      type: "object",
      description: this.description,
      properties: Object.keys(this.properties)
        .map((key) => { return {[key]: this.properties[key].toJSON()}; })
        .reduce((acc, props) => { return Object.assign(acc, props); }, {}),
      additionalProperties: this.additionalProperties,
      required: this.required,
    };
  }
  createValidationFunction() {
    const propertiesExists = function (listKeys, object, errorMsg) {
      return listKeys.reduce((errors, propKey) => {
        if (!object[propKey]) {
          errors.push(errorMsg.replace("%propKey%", propKey));
        }
        return errors;
      }, []);
    };
    const requiredProperties = this.required;
    const additionalProperties = this.additionalProperties;
    const properties = this.properties;
    return function (object) {
      if (Object.keys(object).length > 0) {
        //First we test if the required properties exists
        if (requiredProperties && requiredProperties.length > 0) {
          const undefinedProperties = propertiesExists(
            requiredProperties,
            object,
            "The property %propKey% is required but not found."
          );
          if (undefinedProperties.length > 0) {
            return undefinedProperties;
          }
        }
        //We verify if there should be additionals Properties or not
        if (!additionalProperties) {
          const notAllowedProperties = propertiesExists(
            Object.keys(object),
            properties,
            "The property %propKey% isn't allowed by the schema."
          );
          if (notAllowedProperties.length > 0) {
            return notAllowedProperties;
          }
        }
        // Validate all values with the definition for the propKey
        const validationErros = Object.keys(object)
          .reduce(function (errors, propKey) {
            if (properties[propKey]) {
              const errorsChild = properties[propKey].validate(object[propKey]);
              if (errorsChild) {
                errors.push({path: propKey, errors: errorsChild });
              }
            }
            return errors;
          }, []);
        return (validationErros.length > 0) ? validationErros : false;
      }
      return ["The type should be Object"];
    };
  }
}


module.exports = {
  // semverFromStr,
  // SemVer,
  // ObjectSchema,
  PlainObject,
};
