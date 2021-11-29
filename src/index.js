import _ from 'lodash';
import path from 'path';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), filepath1);
  const path2 = path.resolve(process.cwd(), filepath2);

  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));

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