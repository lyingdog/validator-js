/*
  @description 判断是否小于最小值
  @param data 输入值
  @param val 预设最小值
  @return {boolean} 结果
 */
const min = function (data, val) {
  return (+data) >= (+val)
}

module.exports = min;
