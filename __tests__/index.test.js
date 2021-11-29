import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);

test('Compare plain json', () => {
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  const result = `{
- follow: false
  host: hexlet.io
- proxy: 123.234.53.22
- timeout: 50
+ timeout: 20
+ verbose: true
}`;
 
  expect(genDiff(path1, path2)).toEqual(result);
});
