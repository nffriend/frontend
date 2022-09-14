import Big from 'bignumber.js';
import dayjs from 'dayjs';
var relativeTime = require('dayjs/plugin/relativeTime');
dayjs.extend(relativeTime);

Big.config({
  FORMAT: {
    prefix: '',
    decimalSeparator: '.',
    groupSeparator: ',',
    groupSize: 3,
    secondaryGroupSize: 0,
    fractionGroupSeparator: ' ',
    fractionGroupSize: 0,
    suffix: ''
  }
})
export const plus = (a: number | string, b: number | string) => {
  if (!a || !b) {
    return 0;
  }
    return new Big(a).plus(b).toNumber();
}

export const minus = (a: number | string, b: number | string) => {
  if (!a || !b) {
    return 0;
  }
    return new Big(a).minus(b).toNumber();
}

// 乘法
export const mult = (a: number | string, b: number | string) => {
  if (!a || !b) {
    return 0;
  }
    return new Big(a).multipliedBy(b).toNumber();
}

// 除法
export const div = (a: number | string, b: number | string) => {
  if (!a || !b) {
    return 0;
  }
    return new Big(a).dividedBy(b).toNumber();
}

// 保留n位小数点， 不四舍五入
export const fixed = (a: number | string, n?: number) => {
  if (!n) {
    return new Big(a).toFixed();
  }
  return new Big(a).toFixed(n, 1);
}

// a是否比b大
export const gt = (a: number | string, b: number | string) => {
  return new Big(a).gt(b);
}

// a是否比b小
export const lt = (a: number | string, b: number | string) => {
  return new Big(a).lt(b);
}

// 格式化，千分位
export const formatNum = (x: number | string) => {
  return new Big(x).toFormat()
}
// 格式化日期 13位时间戳
export const formatTime = (dateStr: number | string, formatStr = "YYYY-MM-DD HH:mm:ss", needDate?: boolean) => {
  let timestamp = dateStr;
  if (needDate) {
    timestamp = new Date(dateStr).getTime();
  }
  if (String(timestamp).length === 10) {
    timestamp = `${timestamp}000`;
  }

  if (Date.now() - Number(timestamp) > 24 * 60 * 60 * 1000) {
    return dayjs(timestamp).format(formatStr);
  }
  return (dayjs(timestamp) as any).fromNow();
}

  /**
    给字符串打马赛克
    如：将123456转换为1****6，最多将字符串中间6个字符变成*
    如果字符串长度小于等于2，将不会有效果
    @param {String} str 待处理字符串
    @return {String} 处理后的字符串
  */
export const addMosaic = (str: string | null | undefined) => {
  if (!str) {
    return '';
  }
  const s = String(str);
  if (s.length <= 10) {
    return s;
  }
  return `${s.slice(0,6)}...${s.slice(-4)}`
  
}
    
// 计算价格
export const formatAmount = (amount: string | number, decimal: number) => {
  if (!amount || !decimal) {
    return "0";
  }
  const res = new Big(amount).dividedBy(10 ** decimal).toString();
  return res;
}

const res = {
  plus,
  minus,
  mult,
  div,
  fixed,
  formatTime,
  addMosaic,
  gt,
  lt,
  formatNum,
  formatAmount
}

export default res;