
/**
 * 生成随机len位数字
 */
export const randomLenNum = (len, date) => {
  let random = '';
  random = Math.ceil(Math.random() * 100000000000000).toString().substr(0, len ? len : 4);
  if (date) random = random + Date.now();
  return random;
};
/**
 * 生成随机len位字符串
 * @param {number} len 字符串长度
 * @param date 是否拼接时间
 * @returns {string} 随机字符串
 */
export const randomLenStr = (len, date = false) => {
    const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let result = '';
    for (let i = 0; i < (len || 4); i++) {
        const idx = Math.floor(Math.random() * chars.length);
        result += chars.charAt(idx);
    }
    if (date) result += Date.now();
    return result;
};
