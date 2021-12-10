import _ from 'lodash';

const makeIndent = (str, size) => str.padStart(size, ' ');

const spacesCount = 4;

export default (obj) => {
  const iter = (currentValue, depth) => {
    if (!_.isPlainObject(currentValue)) return currentValue;

    const indentSize = depth * spacesCount;
    const bracketIndent = makeIndent('', indentSize - spacesCount);

    const lines = Object
      .entries(currentValue)
      .flatMap(([key, val]) => {
        switch (val.type) {
          case 'object':
            return `${makeIndent('', indentSize)}${key}: ${iter(val.children, depth + 1)}`;
          case 'added':
            return `${makeIndent('+ ', indentSize)}${key}: ${iter(val.newValue, depth + 1)}`;
          case 'removed':
            return `${makeIndent('- ', indentSize)}${key}: ${iter(val.oldValue, depth + 1)}`;
          case 'updated':
            return [`${makeIndent('- ', indentSize)}${key}: ${iter(val.oldValue, depth + 1)}`,
              `${makeIndent('+ ', indentSize)}${key}: ${iter(val.newValue, depth + 1)}`];
          case 'unchanged':
            return `${makeIndent('', indentSize)}${key}: ${iter(val.oldValue, depth + 1)}`;
          default:
            return `${makeIndent('', indentSize)}${key}: ${iter(val, depth + 1)}`;
        }
      });

    return [
      '{',
      ...lines,
      `${bracketIndent}}`,
    ].join('\n');
  };

  return iter(obj, 1);
};
