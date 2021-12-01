import _ from 'lodash';
import parse from './parsers.js';

export default (filepath1, filepath2) => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const merge = { ...obj1, ...obj2 };

  const arr = Object.entries(merge)
    .sort()
    .map(([key, value]) => {
      if (_.isUndefined(obj1[key])) return `+ ${key}: ${value}`;
      if (_.isUndefined(obj2[key])) return `- ${key}: ${value}`;
      if (obj1[key] !== value) return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
      return `  ${key}: ${value}`;
    });

  const str = `{\n${arr.join('\n')}\n}`;

  return str;
};
