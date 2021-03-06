import parse from './parsers.js';
import diff from './diff.js';
import formatter from './formatters/index.js';

export default (filepath1, filepath2, format = 'stylish') => {
  const obj1 = parse(filepath1);
  const obj2 = parse(filepath2);

  const diffObj = diff(obj1, obj2);

  return formatter(diffObj, format);
};
