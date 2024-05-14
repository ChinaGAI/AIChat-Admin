import numeral from 'numeral';

numeral.register('format', 'ac', {
  regexps: {
    format: /(ac)/,
    unformat: /(ac)/,
  },
  format: function (val: number, format: string) {
    const space = format.indexOf(' ') > -1 ? ' ' : '';
    let output = '',
      value = val;
    if (value >= 1e8) {
      output = '亿';
      value = value / 1e8;
    } else if (value >= 1e4) {
      output = '万';
      value = value / 1e4;
    }

    return numeral._.numberToFormat(value, format.replace(/ac/, ''), Math.floor) + space + output;
  },
  unformat: function (value: string) {
    const _value = value.replace(/(百亿|十亿|亿|千万|百万|十万|万|千)/, '');
    return numeral._.stringToNumber(_value);
  },
});

export default numeral;
