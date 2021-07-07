/*
  @description 判断是否超出最大值
  @param data 输入值
  @param val 预设最大值
  @return {boolean} 结果
 */
const max = function (data, val) {
  return (+data) <= (+val)
}

module.exports = max;
