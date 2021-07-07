const Validator = require('./validator');

const data = {
  arr: [1, 2, 3],
  list: [1, 2, 3, 4]
};

Validator.addRule('R_EQUAL', function (data) {
  console.log('R_EQUAL', data);
  return true;
})

const validate = new Validator(data);

const errs = validate
  .all(["MAX_LENGTH:4", "MIN_LENGTH:1"], '长度不符合规则')
  .allWithout(["MIN_LENGTH:3"], "长度不符合规则")
  .every(v => v.every(n => n > 0), '数值不符合')
  .some(['arr', 'list'], v => v.length > 3, '数组长度不符合')
  .expect('list', "MAX_LENGTH:1", 'list的长度不能大于1')
  .expect('list', "R_EQUAL:5", "巴拉啦小魔仙")
  .relative('arr', 'list', (v1, v2) => v1.length > v2, 'arr的长度不能小于list的长度')
  .compare((data) => {
    console.log('compare get data', data);
    return true;
  }, '测试compare能不能拿到data')
  .end();

console.log('errs', errs);