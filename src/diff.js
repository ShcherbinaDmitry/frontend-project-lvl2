import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys1 = _.keys(obj1);
  const keys2 = _.keys(obj2);
  const keys = _.sortBy(_.union(keys1, keys2));

  const iter = (acc, key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return { ...acc, [key]: { children: diff(oldValue, newValue), type: 'object' } };
    } if (!_.has(obj1, key)) {
      return { ...acc, [key]: { newValue, type: 'added' } };
    } if (!_.has(obj2, key)) {
      return { ...acc, [key]: { oldValue, type: 'removed' } };
    } if (oldValue === newValue) {
      return { ...acc, [key]: { oldValue, type: 'unchanged' } };
    }
    return { ...acc, [key]: { newValue, oldValue, type: 'updated' } };
  };

  return keys.reduce(iter, {});
};

export default diff;
