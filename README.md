## verify-data-js
用于做数据的验证

## 安装
```
npm install verify-data-js
```

## 使用
```javascript
const Validator = require('verify-data-js');

const data = {
  arr: [1, 2, 3],
  list: [1, 2, 3, 4]
};

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
// [
//   {
//     type: 'every or some',
//     key: 'arr',
//     value: [ 1, 2, 3 ],
//     msg: '数组长度不符合'
//   }, 
//   ****
// ]
```

## 使用方法
```javascript
rules及rules的使用方法
{
  "REQUIRED": "必须输入",
  "IS_DIGITS": "整数",
  "MAX": "最大数字", // MAX:3
  "MIN": "最小数字", // MIN:5
  "MAX_LENGTH": "最大长度", // MAX_LENGTH:5
  "MIN_LENGTH": "最小长度", // MIN_LENGTH:5
  "REGEXP": "正则", // REGEXP:/bbb/
  "PHONE": "电话号码",
  "TEL": "手机号码",
  "EMAIL": "邮件",
  "TYPE": "类型" // TYPE:array
}

后面有注释的即为需要[:value]的rule

api: 
传入的rules可以为字符串或者数组，数组表示需要满足每一个rule "MAX_LENTH:3" || ["MAX_LENGTH:5", "MIN_LENGTH:1"]

// 所有的值都满足传入的rules，msg为需要返回的错误msg
all(rules, msg)

// 除了keys以外的所有值都满足传入的rules,msg为需要返回的错误msg, keys为需要排除的key列表
allWithout(rules, msg, keys = [])

// 指定的值满足传入的rules
expect(key, rules, msg)

// 每个值都满足value条件，value是值，或者callback, data可传可不传，不传默认为this.data
every(value, msg, data)

// 某些值(键名为keys列表中的值)都满足value条件，value是值，或者callback
some(keys, value, msg)

// 比较两个键名为k1,k2值的关系, callback为回调函数, callback(v1, v2)
relative(k1, k2, callback, msg)


//@description 自定义进行比较
//@param callback {function} 比较规则，会传入this.data作为第一个参数
//@param msg {string} 失败后的提示
compare(callback, msg)

// 必须在结尾使用，表示校验完成，返回一个校验有问题的数组，数组length为0，即为验证通过
end()

// 添加自定义的rule，格式为 R_*
static addRule(rule, callback) {
  rules.push(rule);
  rulesMap[rule] = callback;
}

Validator.addRule('R_EQUAL', function (data, value) {
  return data === value;
})
```
