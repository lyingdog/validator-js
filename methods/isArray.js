// 判断是否是数组
const isArray = function (data) {
  return Object.prototype.toString.call(data).slice(8, -1) === 'Array';
}

module.exports = isArray;