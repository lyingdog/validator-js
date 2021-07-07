/*
  @description 判断是否符合手机号码正则
  @param data 输入值
  @return {boolean} 结果
 */
const phone = function (data, r) {
  const reg = r || /^1[3456789]\d{9}$/;
  return reg.test(data);
}

module.exports = phone;
