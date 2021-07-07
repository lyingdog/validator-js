const isArray = require('../methods/isArray');
const max = require('../methods/max');
const maxLength = require('../methods/max-length');
const min = require('../methods/min');
const minLength = require('../methods/min-length');
const regexp = require('../methods/regexp');
const digits = require('../methods/digits');
const email = require('../methods/email');
const phone = require('../methods/phone');
const tel = require('../methods/tel');
const type = require('../methods/type');
const required = require('../methods/required');


// isArray
test("[1,2,3] is Array", () => {
  expect(isArray([1, 2, 3])).toBe(true)
})

test("{} is not Array", () => {
  expect(isArray({})).toBe(false)
})

test("'123' is not Array", () => {
  expect(isArray('123')).toBe(false)
})

// max, min
test("'3' < '12'", () => {
  expect(max('3', '12')).toBe(true)
})
test("'3' < '12'", () => {
  expect(min('3', '12')).toBe(false)
})
test("5 > 1", () => {
  expect(max(5, 1)).toBe(false)
})
test("5 > 1", () => {
  expect(min(5, 1)).toBe(true)
})

// maxLength, minLength
test("[1, 2, 3].length < 4", () => {
  expect(maxLength([1, 2, 3], 4)).toBe(true)
})

test("[1, 2, 3].length < 4", () => {
  expect(minLength([1, 2, 3], 4)).toBe(false)
})

test("'12345'.length > 1", () => {
  expect(maxLength('12345', 1)).toBe(false)
})

test("'12345'.length > 1", () => {
  expect(minLength('12345', 1)).toBe(true)
})

// phone
test("123456 is not a phone number", () => {
  expect(phone('123456')).toBe(false)
})

test("88176532 is a phone number", () => {
  expect(phone('88176532')).toBe(true)
})

test("021-88176532 is a phone number", () => {
  expect(phone('021-88176532')).toBe(true)
})

// tel
test("123456 is not a tel number", () => {
  expect(tel('123456')).toBe(false)
})

test("13788215647 is a tel number", () => {
  expect(tel('13788215647')).toBe(true)
})

// type
test("123 is number", () => {
  expect(type(123, 'number')).toBe(true)
})

test("[1, 2, 3] is array", () => {
  expect(type([1, 2, 3], 'array')).toBe(true)
})

test("{} is object", () => {
  expect(type({}, 'object')).toBe(true)
})

test("true is boolean", () => {
  expect(type(true, 'boolean')).toBe(true)
})

test("str is string", () => {
  expect(type('str', 'string')).toBe(true)
})

// email
test("mdfgfdgdfg@163.com is an email", () => {
  expect(email('mdfgfdgdfg@163.com')).toBe(true)
})

test("mdfgfdgdfg163.com is not an email", () => {
  expect(email('mdfgfdgdfg163.com')).toBe(false)
})

// digits
test('1.1 is not digits', () => {
  expect(digits(1.1)).toBe(false)
})

test('-2 is digits', () => {
  expect(digits(-2)).toBe(true)
})

// required
test('123 is valid', () => {
  expect(required(123)).toBe(true)
})

test("'' is invalid", () => {
  expect(required('')).toBe(false)
})

test('undefined is invalid', () => {
  expect(required(undefined)).toBe(false)
})

// regexp
test('/bbb/ is test bbbbb', () => {
  expect(regexp('bbbb', '/bbb/')).toBe(true)
})

test('/bbb/ is not test bba', () => {
  expect(regexp('bba', '/bbb/')).toBe(false)
})
