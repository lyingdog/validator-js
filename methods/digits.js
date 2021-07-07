// 判断是否为整数
const digits = function (data) {
  return typeof data === 'number' && (data % 1 === 0)
}

module.exports = digits;
