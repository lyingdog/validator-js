/*
  @description 判断是否符合正则
  @param data 输入值
  @param reg 正则字符串
  @return {boolean} 结果
 */
const regexp = function (data, reg) {
  const r = eval(reg);
  return r.test(data);
}

module.exports = regexp;
