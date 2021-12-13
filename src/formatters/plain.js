import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) return '[complex value]';

  if (typeof value === 'string') return `'${value}'`;

  return value;
};

export default (obj) => {
  const iter = (currentValue, path) => {
    const lines = Object.entries(currentValue)
      .flatMap(([key, val]) => {
        switch (val.type) {
          case 'object':
            return iter(val.children, [...path, key]);
          case 'added':
            return `Property '${[...path, key].join('.')}' was added with value: ${stringify(val.newValue)}`;
          case 'removed':
            return `Property '${[...path, key].join('.')}' was removed`;
          case 'updated':
            return `Property '${[...path, key].join('.')}' was updated. From ${stringify(val.oldValue)} to ${stringify(val.newValue)}`;
          case 'unchanged':
            return null;
          default:
            return 'Something went wrong';
        }
      }).filter((n) => n);

    return lines;
  };

  return iter(obj, []).join('\n');
};
