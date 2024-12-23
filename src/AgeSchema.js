export default class AgeSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(age) {
    return this.validators.every((validator) => validator(age));
  }

  isAdult() {
    const validator = (age) => age >= 18;
    return new AgeSchema([...this.validators, validator]);
  }
}
