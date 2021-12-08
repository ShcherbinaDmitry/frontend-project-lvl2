import _ from 'lodash';

export default (value, replacer = ' ', spacesCount = 4) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) {
      return currentValue;
    }

    const makeIndent = (str, size, indent) => str.padStart(size, indent);

    const stringify = (key, val, size, indent) => {
      if (key === 'type') return null;

      switch (val.type) {
        case 'object':
          return `${makeIndent('', size, indent)}${key}: ${iter(val.children, depth + 1)}`;
        case 'added':
          return `${makeIndent('+ ', size, indent)}${key}: ${iter(val.newValue, depth + 1)}`;
        case 'deleted':
          return `${makeIndent('- ', size, indent)}${key}: ${iter(val.oldValue, depth + 1)}`;
        case 'changed':
          return [`${makeIndent('- ', size, indent)}${key}: ${iter(val.oldValue, depth + 1)}\n${makeIndent('+ ', size, indent)}${key}: ${iter(val.newValue, depth + 1)}`];
        case 'unchanged':
          return `${makeIndent('', size, indent)}${key}: ${iter(val.oldValue, depth + 1)}`;
        default:
          return `${makeIndent('', size, indent)}${key}: ${iter(val, depth + 1)}`;
      }
    };

    const indentSize = depth * spacesCount;
    const currentIndent = replacer.repeat(indentSize);
    const bracketIndent = replacer.repeat(indentSize - spacesCount);

    const lines = Object
      .entries(currentValue)
      .map(([key, val]) => stringify(key, val, indentSize, currentIndent))
      .filter((n) => n);

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(value, 1);
};
