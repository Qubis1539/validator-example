// @ts-check

import { test } from 'node:test';
import assert from 'assert/strict';
import Validator from '../index.js';

test('step1', () => {
  const v = new Validator();
  const emailSchema = v.email();

  assert.equal(emailSchema.isValid('invalid-email'), false);
  assert.equal(emailSchema.isValid('valid.email@protonmail.com'), true);
  assert.equal(emailSchema.isValid('valid.email@protonmail.ru'), true);
  assert.equal(emailSchema.isValid('valid.email@protonmail.eu'), true);
  assert.equal(emailSchema.isValid('another.invalid@123.45'), true);
  assert.equal(emailSchema.isValid(15613854), false);
  assert.equal(emailSchema.isValid(''), false);
});

test('step2', () => {
  const v = new Validator();

  const emailSchema1 = v.email();
  assert.equal(emailSchema1.isValid('XxXWinnerXxX@gmail.com'), true);

  const emailSchema2 = v.email().setEmailLengthConstraint(4);
  assert.equal(emailSchema2.isValid('Hi!@yahoo.com'), false);
  assert.equal(emailSchema2.isValid('Hello!@protonmail.com'), true);

  const emailSchema3 = v.email().setEmailLengthConstraint(2, 4);
  assert.equal(emailSchema3.isValid('Hello!@protonmail.com'), false);
  assert.equal(emailSchema3.isValid('Hi!@yahoo.com'), true);
});

test('step3', () => {
  const v = new Validator();
  const ageSchema1 = v.age();

  assert.equal(ageSchema1.isValid(25), true);
  assert.equal(ageSchema1.isValid(11), true);
  assert.equal(ageSchema1.isValid('25'), false);
  assert.equal(ageSchema1.isValid('lolololo'), false);
  assert.equal(ageSchema1.isValid(NaN), false);

  const ageSchema2 = v.age().isAdult();
  assert.equal(ageSchema2.isValid(18), true);
  assert.equal(ageSchema2.isValid(10), false);
});

test('step4', () => {
  const v = new Validator();
  const schema = v.user().shape({
    email: v.email().setEmailLengthConstraint(5),
    age: v.age().isAdult(),
  });

  assert.equal(schema.isValid({ email: 'HeyHey@hotmail.eu', age: 61 }), true);
  assert.equal(schema.isValid({ email: 'HoiHoiHoi@gmail.com', age: 17 }), false);
  assert.equal(schema.isValid({ email: 'gege@protonmail.com', age: 82 }), false);
  assert.equal(schema.isValid({ email: 'HeyHey@hotmail.eu', age: 82, name: 'Alex' }), false);
  assert.equal(schema.isValid({ email: 'HeyHey@hotmail.eu' }), false);
});
