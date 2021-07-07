/*
  @description 判断是否小于最小长度
  @param data 输入值
  @param val 预设最小长度
  @return {boolean} 结果
 */
const minLength = function (data, val) {
  return data.length >= (+val)
}

module.exports = minLength;
