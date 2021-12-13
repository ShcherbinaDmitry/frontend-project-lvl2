import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const iter = (acc, key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    const obj = {};

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      obj[key] = { children: diff(oldValue, newValue), type: 'object' };
    } else if (!_.has(obj1, key)) {
      obj[key] = { newValue, type: 'added' };
    } else if (!_.has(obj2, key)) {
      obj[key] = { oldValue, type: 'removed' };
    } else if (oldValue === newValue) {
      obj[key] = { oldValue, type: 'unchanged' };
    } else if (oldValue !== newValue) {
      obj[key] = { newValue, oldValue, type: 'updated' };
    }

    return { ...acc, ...obj };
  };

  return keys.reduce(iter, {});
};

export default diff;
