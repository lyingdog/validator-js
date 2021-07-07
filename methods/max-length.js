/*
  @description 判断是否超出最大长度
  @param data 输入值
  @param val 预设最大长度
  @return {boolean} 结果
 */
const maxLength = function (data, val) {
  return data.length <= (+val)
}

module.exports = maxLength;
