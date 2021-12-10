import path from 'path';
import fs from 'fs';
import yaml from 'js-yaml';

// const extensions = ['json', 'yml', 'yaml'];

export default (filepath) => {
  const ext = path.extname(filepath);
  const objPath = path.resolve(process.cwd(), filepath);
  const data = fs.readFileSync(objPath, 'utf-8');

  if (ext === '.yml' || ext === '.yaml') {
    return yaml.load(data);
  }

  if (ext === '.txt') {
    return data;
  }

  return JSON.parse(data);
};
