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

const rules = [
  "REQUIRED", "IS_DIGITS", "MAX", "MIN",
  "MAX_LENGTH", "MIN_LENGTH", "REGEXP",
  "PHONE", "TEL", "EMAIL", "TYPE"
];

const rulesMap = {
  MAX: max,
  MIN: min,
  MAX_LENGTH: maxLength,
  MIN_LENGTH: minLength,
  REQUIRED: required,
  TEL: tel,
  EMAIL: email,
  PHONE: phone,
  REGEXP: regexp,
  IS_DIGITS: digits,
  TYPE: type
};

class Validator {
  errs = [];
  constructor(data) {
    // 初始化
    this.data = {
      ...data
    };

    // @弃用
    // 给自定义的rule绑定参数data,可能
    // for (let k of Object.keys(rulesMap)) {
    //   if (k.indexOf('R_') === 0) {
    //     rulesMap[k] = rulesMap[k].bind(null, this.data);
    //   }
    // }
  }

  /*
    @description 把传入的单个rule序列化
    @param rule {string}规则
    @return object 序列化以后的rule
  */
  realizeRule(rule) {
    const index = rule.indexOf(':');
    let res;
    if (index === -1) {
      res = {
        type: rule,
        value: null
      }
    } else {
      const type = rule.slice(0, index);
      const value = rule.slice(index + 1).trim();
      res = {
        type,
        value
      };
    }
    const inType = rules.includes(res.type);
    if (!inType) {
      console.log(`type: ${res.type},是无效的验证规则`)
    }
    return inType ? res : false;
  }

  /*
    @description 解析传入的rules
    @param rules {string | array} 传入的rules
    @return array 获取的rules数组
  */
  takeRules(rules) {
    const arr = [];
    if (typeof rules === 'string') {
      const r = this.realizeRule(rules);
      r && arr.push(r);
      return arr;
    }
    if (isArray(rules)) {
      for (let r of rules) {
        const res = this.realizeRule(r);
        res && arr.push(res);
      }
      return arr;
    }
    return [];
  }

  /*
    @description 判断值是否符合rules
    @param k key
    @param v value
    @param msg 错误提示
    @return array 返回检测出问题的list
  */
  checkRules(k, v, rules, msg) {
    const errs = [];
    for (let r of rules) {
      const result = rulesMap[r.type](v, r.value);
      if (result !== true) {
        errs.push({
          type: r.type,
          key: k,
          value: v,
          msg
        });
      }
    }
    return errs
  }

  // 所有的值都满足传入的rules
  all(rules, msg) {
    const rs = this.takeRules(rules);
    for (let k of Object.keys(this.data)) {
      const v = this.data[k];
      const errs = this.checkRules(k, v, rs, msg);
      this.errs = [...this.errs, ...errs]
    }
    return this;
  }

  // 除了keys以外的所有值都满足传入的rules
  allWithout(rules, msg, keys = []) {
    const rs = this.takeRules(rules);
    const data = {
      ...this.data
    };
    for (let k of keys) {
      delete data[k]
    }
    for (let k of Object.keys(data)) {
      const v = data[k];
      const errs = this.checkRules(k, v, rs, msg);
      this.errs = [...this.errs, ...errs]
    }
    return this;
  }

  // 指定的值满足传入的rules
  expect(key, rules, msg) {
    const rs = this.takeRules(rules);
    const v = this.data[key];
    const errs = this.checkRules(key, v, rs, msg);
    this.errs = [...this.errs, ...errs];
    return this;
  }

  // 每个值都满足value条件，value是值，或者callback, data可传可不传，不传默认为this.data
  every(value, msg, data) {
    for (let k of Object.keys(data || this.data)) {
      const v = this.data[k];
      let res;
      if (typeof value === 'function') {
        res = value(v, this.data);
      } else {
        res = (v === value)
      }
      if (!res) {
        this.errs.push({
          type: 'every or some',
          key: k,
          value: v,
          msg
        })
      }
    }
    return this;
  }

  // 某些值个值都满足value条件，value是值，或者callback
  some(keys, value, msg) {
    const data = keys.reduce((a, b) => {
      a[b] = this.data[b];
      return a;
    }, {})
    this.every(value, msg, data);
    return this;
  }

  // 比较两个值的关系
  relative(k1, k2, callback, msg) {
    const v1 = this.data[k1];
    const v2 = this.data[k2];
    const res = callback(v1, v2, this.data);
    if (!res) {
      this.errs.push({
        type: `relative: ${k1}, ${k2}`,
        key: k1,
        value: v1,
        msg
      })
    }
    return this;
  }

  /*
    @description 自定义进行比较
    @param callback {function} 比较规则
    @param msg {string} 失败后的提示
  */
  compare(callback, msg) {
    const res = callback(this.data);
    if (!res) {
      this.errs.push({
        type: `compare`,
        key: null,
        value: null,
        msg
      })
    }
    return this;
  }

  // 校验完成
  end() {
    return this.errs;
  }

  // 添加自定义的rule，R_*, 会向callback中传入data
  static addRule(rule, callback) {
    rules.push(rule);
    rulesMap[rule] = callback;
  }
}

module.exports = Validator;
