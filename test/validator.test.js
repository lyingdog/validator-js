const Validator = require('../dist/validator');

const data1 = {
  arr: [1, 2, 3],
  list: [1, 2, 3, 4]
};

const data2 = {
  str: 'string',
  num: 123,
  num1: 125,
  obj: {
    name: 'ddd'
  },
  arr: [1, 2, 3],
  five: 5
};

test('data1 all length > 2 && < 5', () => {
  const validator = new Validator(data1);
  const errs = validator.all(["MAX_LENGTH:5", "MIN_LENGTH:2"], 'length invalid').end();
  expect(errs.length).toBe(0);
})

test('data1 arr length < 4', () => {
  const validator = new Validator(data1);
  const errs = validator.allWithout("MAX_LENGTH:3", 'length invalid', ['list']).end();
  expect(errs.length).toBe(0);
})

test('data1 all arr children !== 2', () => {
  const validator = new Validator(data1);
  const errs = validator.every(2, 'invalid number').end();
  expect(errs.length).toBe(2);
})

test('data1 all arr children > 0', () => {
  const validator = new Validator(data1);
  const errs = validator.every(v => v.every(n => n > 0), 'invalid number').end();
  expect(errs.length).toBe(0);
})

test('data1 list children !== 2', () => {
  const validator = new Validator(data1);
  const errs = validator.some(['list'], 2, 'invalid number').end();
  expect(errs.length).toBe(1);
})

test('data1 list children > 0', () => {
  const validator = new Validator(data1);
  const errs = validator.some(['list'], v => v.every(n => n > 0), 'invalid number').end();
  expect(errs.length).toBe(0);
})

test('invalid rule name', () => {
  const validator = new Validator(data2);
  const errs = validator.expect('num', {}, 'invalid num').end();
  expect(errs.length).toBe(0);
})

test('invalid rule name', () => {
  const validator = new Validator(data2);
  const errs = validator.expect('num', 'MAXXXX', 'invalid num').end();
  expect(errs.length).toBe(0);
})

test('invalid rule', () => {
  const validator = new Validator(data2);
  const errs = validator.expect('num', 'MAX', 'invalid num').end();
  expect(errs.length).toBe(1);
})

test('data2 num < num1', () => {
  const validator = new Validator(data2);
  const errs = validator
    .relative('num', 'num1', (v1, v2) => v1 > v2, 'invalid num')
    .expect('num', 'MAX:125', 'invalid num')
    .end();
  expect(errs.length).toBe(1);
})

// add rule
test('add rule', () => {
  Validator.addRule('R_EQUAL', function (data, val) {
    console.log('data val', data, val);
    return data == val;
  })

  const validator = new Validator(data2);
  const errs = validator.expect('five', 'R_EQUAL:5', 'invalid num').end();
  expect(errs.length).toBe(0);
})

// compare
test('compare', () => {
  const validator = new Validator(data2);
  const errs = validator.compare((data) => {
    return (data.num === 123) && (data.num1 === 125)
  }, 'invalid num').end();
  expect(errs.length).toBe(0);
})

test('compare', () => {
  const validator = new Validator(data2);
  const errs = validator.compare((data) => {
    return data.arr.length === 6
  }, 'invalid num').end();
  expect(errs.length).toBe(1);
})
