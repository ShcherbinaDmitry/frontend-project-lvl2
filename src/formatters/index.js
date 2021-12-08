import stylish from './stylish.js';
import plain from './plain.js';

export default (obj, format) => {
  if (format === 'stylish') {
    return stylish(obj);
  }
  if (format === 'plain') {
    return plain(obj);
  }

  return "Incorrect format. Try 'plain' or 'stylish'";
};
