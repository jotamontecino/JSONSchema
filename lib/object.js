const JSONType = require("./jsonType");

// Factory to create a semVer from a string
function semverFromStr(string) {
  if (/\d+\.\d+.\d+$/.test(string)) {
    const matchs= string.split(".")
    return new SemVer(matchs[0], matchs[1], matchs[2])
  }
}
// Creates a version Object
class SemVer {
  constructor(major, minor, fix) {
    if (typeof major === "string" &&
        typeof minor === "string" &&
        typeof fix === "string" )
    {
      this.major = major;
      this.minor = minor;
      this.fix = fix;
    } else {
      throw new Error ("Caca bis version")
    }
  }
  getMaj() {
    return this.major;
  }
  getMin() {
    return this.minor;
  }
  getFix() {
    return this.fix;
  }
}

class ObjectSchema {
  constructor(semver, JSONSchema) {
    this.semver = semver;
    this.schema = JSONFactory(JSONSchema);
  }
}




class PlainObject extends JSONType  {
  constructor({type, description, required, properties, additionalProperties}) {
    super();
    if (type === "object") {
      this.description = description | "";
      this.setRequired(required);
      processProperties(properties);
    }
    throw new Error ("Caca bis version")
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
    this.properties[key] = JSONFactory(schema);
  }

  // Set the field required if all values are Strings.
  setRequired(required) {
    if (Array.isArray(required) && required.length > 0) {
      const flag = required.filter((item) => typeof item === "string").length;
      if (required.length === flag) {
        this.required = required;
        return;
      }
      throw new Error("caca bis")
    }
    return;
  }

}


module.exports = {
  semverFromStr,
  SemVer,
  ObjectSchema,
  PlainObject,
};
