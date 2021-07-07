/*
  @description 判断是否符合邮箱正则
  @param data 输入值
  @return {boolean} 结果
 */
const email = function (data) {
  const reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/;
  return reg.test(data);
}

module.exports = email;
