import AgeSchema from './AgeSchema.js';
import EmailSchema from './EmailSchema.js';
import ObjectSchema from './ObjectSchema.js';

export default class Validator {
  email() {
    return new EmailSchema([(value) => typeof value === 'string' && value.length > 0 && value.includes('@')]);
  }

  age() {
    return new AgeSchema([(value) => typeof value === 'number' && !Number.isNaN(value)]);
  }

  user() {
    return new ObjectSchema();
  }
}
