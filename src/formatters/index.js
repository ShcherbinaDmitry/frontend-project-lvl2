import stylish from './stylish.js';
import plain from './plain.js';

export default (obj, format) => {
  switch (format) {
    case 'stylish':
      return stylish(obj);
    case 'plain':
      return plain(obj);
    case 'json':
      return JSON.stringify(obj);
    default:
      return 'Choose correct format (stylish, plain or json)';
  }
};
