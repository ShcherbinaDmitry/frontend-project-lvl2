import _ from 'lodash';

const stringify = (value) => {
  if (_.isPlainObject(value)) return '[ complex value ]';

  return value;
};

export default (obj) => {
  const iter = (currentValue, path) => {
    const result = Object
      .entries(currentValue)
      .filter(({ type }) => type !== 'unchanged')
      .map(([key, value]) => {
        // console.log(key, value);
        return '';
      });

    return result;
  };

  return iter(obj, '');
};
