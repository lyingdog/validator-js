// undefined和空字符串 视为没传值
const required = function (data) {
  return (data !== undefined) && (data !== '');
}

module.exports = required;
