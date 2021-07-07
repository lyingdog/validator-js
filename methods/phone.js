/*
  @description 判断是否符合固定电话正则
  @param data 输入值
  @return {boolean} 结果
 */
const phone = function (data, r) {
  const reg = r || /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/;
  return reg.test(data);
}

module.exports = phone;
