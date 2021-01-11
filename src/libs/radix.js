import { ref } from "vue";

export function radixOption() {
  const lenbits = ref(32);
  const signed = ref(true);
  const setBits = (bits) => {
    lenbits.value = bits;
  };
  const setSign = (sign) => {
    signed.value = sign;
  };
  const radixPrefix = (radix) => {
    switch (radix) {
      case 2:
      case "2":
        return "0b";
      case 8:
      case "8":
        return "0o";
      case 10:
      case "10":
        return "";
      case 16:
      case "16":
        return "0x";
      default:
        return "";
    }
  };
  const strtoRadixstr = (param, radix) => {
    if (param.indexOf("-") >= 0) {
      param = param.replace(/-/, "");
      return "-" + radixPrefix(radix) + param;
    } else {
      return radixPrefix(radix) + param;
    }
  };
  //判定给定参数是否为16进制以内有效表示
  const isNumber = (param) => {
    return /^[0-9a-fA-F]$/.test(param);
  };
  //将给定字符串转为Number类型
  const strtoNumber = (str, radix = 10) => {
    if (str.length == 0) {
      return 0;
    }
    if (str.indexOf(radixPrefix(radix)) >= 0) {
      return Number(str);
    } else {
      if (str.indexOf("-") >= 0) {
        return -Number(radixPrefix(radix) + str.replace(/-/, ""));
      } else {
        return Number(radixPrefix(radix) + str);
      }
    }
  };
  //将给定值转为字符串
  const numtoString = (val, radix = 10) => {
    if (val == undefined) {
      return "";
    }
    if (Number.isInteger(val)) {
      return val.toString(radix).toUpperCase();
    } else {
      return Number(val.toString(radix).toUpperCase()).toFixed(6);
    }
  };
  //真值转二进制字符串
  const valtoBinstr = (val) => {
    const arr = [...Array(lenbits.value).keys()].map(
      (item) => lenbits.value - 1 - item
    );

    var bins = "";
    for (let i in arr) {
      bins += bitofVal(val, arr[i]).toString();
    }
    return bins;
  };
  //二进制字符串转16禁止或八进制字符串
  const binsto16 = (bins) => {
    return Number("0b" + bins).toString(16);
  };
  const binsto8 = (bins) => {
    return Number("0b" + bins).toString(8);
  };
  //有符号转无符号
  //无符号转有符号
  //判定给定数否在限定bit长度内
  const isRange = (val) => {
    if (signed.value) {
      if (
        val <= Math.pow(2, lenbits.value - 1) - 1 &&
        val >= -Math.pow(2, lenbits.value - 1)
      ) {
        return true;
      }
    } else {
      if (val >= 0 && val <= Math.pow(2, lenbits.value)) {
        return true;
      }
    }
    return false;
  };
  //据bit长度返回通常描述
  const bytesDescription = () => {
    switch (lenbits.value) {
      case 8:
        return "BYTE";
      case 16:
        return "WORD";
      case 32:
        return "DWORD";
      case 64:
        return "QWORD";
      default:
        return "BYTE";
    }
  };
  //返回给定bit位01值
  const bitofVal = (val, bit) => {
    return (val & (1 << bit)) == 0 ? 0 : 1;
  };
  //据bit位更改给定值
  const bitChange = (val, bit) => {
    const sets = (val & (1 << bit)) === 0 ? 0 : 1;
    if (sets) {
      //该位值1则置零
      val &= ~(1 << bit);
    } else {
      val |= 1 << bit;
    }
    return val;
  };
  
  //数值字符串长度更改
  return {
    setBits,
    setSign,
    radixPrefix,
    strtoRadixstr,
    isNumber,
    strtoNumber,
    numtoString,
    isRange,
    bytesDescription,
    bitofVal,
    bitChange,
    valtoBinstr,
    binsto16,
    binsto8,
  };
}
