export default class EmailSchema {
  constructor(validators) {
    this.validators = [...validators];
  }

  isValid(email) {
    return this.validators.every((validator) => validator(email));
  }

  setEmailLengthConstraint(min, max = Infinity) {
    const validator = (email) => email.split('@')[0].length >= min
            && email.split('@')[0].length <= max
            && email.split('@')[1]
            && email.split('@')[1].length > 0;
    return new EmailSchema([...this.validators, validator]);
  }
}
