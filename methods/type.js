// 判断类型
const type = function (data, type) {
  const str = Object.prototype.toString.call(data).slice(8, -1).toLowerCase();
  const t = type.toLowerCase()
  return str === t;
}

module.exports = type;
