class JSONType {
  constructor() {}
  setDefault() {
    if (this.defaultValue) {
      this.value = this.defaultValue;
    }
  }
  toString() {
    return JSON.stringify(this.toJSON())
  }
}

module.exports = JSONType;
