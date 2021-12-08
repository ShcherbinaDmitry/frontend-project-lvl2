import _ from 'lodash';

const diff = (obj1, obj2) => {
  const keys = _.union(Object.keys(obj1), Object.keys(obj2)).sort();
  const iter = (acc, key) => {
    const oldValue = obj1[key];
    const newValue = obj2[key];

    if (_.isPlainObject(oldValue) && _.isPlainObject(newValue)) {
      return {
        ...acc,
        [key]: {
          children: diff(oldValue, newValue), type: 'object',
        },
        type: 'object',
      };
    }

    if (!_.has(obj1, key)) {
      return {
        ...acc,
        [key]: {
          newValue, type: 'added',
        },
      };
    }

    if (!_.has(obj2, key)) {
      return {
        ...acc,
        [key]: {
          oldValue, type: 'deleted',
        },
      };
    }

    if (oldValue !== newValue) {
      return {
        ...acc,
        [key]: {
          newValue, oldValue, type: 'changed',
        },
      };
    }

    return {
      ...acc,
      [key]: {
        oldValue, type: 'unchanged',
      },
    };
  };

  return keys.reduce(iter, {});
};

export default diff;
