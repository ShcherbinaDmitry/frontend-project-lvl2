import _ from 'lodash';

const makeIndent = (str, size) => str.padStart(size, ' ');

const spaces = 4;

export default (obj) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) return currentValue;
    const indent = depth * spaces;

    const lines = Object.entries(currentValue)
      .flatMap(([key, val]) => {
        switch (val.type) {
          case 'object':
            return `${makeIndent('', indent)}${key}: ${iter(val.children, depth + 1)}`;
          case 'added':
            return `${makeIndent('+ ', indent)}${key}: ${iter(val.newValue, depth + 1)}`;
          case 'removed':
            return `${makeIndent('- ', indent)}${key}: ${iter(val.oldValue, depth + 1)}`;
          case 'updated':
            return [`${makeIndent('- ', indent)}${key}: ${iter(val.oldValue, depth + 1)}`,
              `${makeIndent('+ ', indent)}${key}: ${iter(val.newValue, depth + 1)}`];
          case 'unchanged':
            return `${makeIndent('', indent)}${key}: ${iter(val.oldValue, depth + 1)}`;
          default:
            return `${makeIndent('', indent)}${key}: ${iter(val, depth + 1)}`;
        }
      });

    return ['{', ...lines, `${makeIndent('', indent - spaces)}}`].join('\n');
  };

  return iter(obj, 1);
};
