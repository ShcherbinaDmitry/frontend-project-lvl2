import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parsers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Diff of plain objects', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'plain', filename);
  const result = parse(getFixturePath('result.txt'));

  // Test plain JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, 'stylish')).toEqual(result);

  // Test plain YAML
  const path1yml = getFixturePath('file1.yml');
  const path2yml = getFixturePath('file2.yml');

  expect(genDiff(path1yml, path2yml, 'stylish')).toEqual(result);
});

test('Diff of nested objects with stylish output', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);
  const result = parse(getFixturePath('result.txt'));

  // Testing nested JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, 'stylish')).toEqual(result);

  // Testing nested YAML
  const path1yml = getFixturePath('file1.yml');
  const path2yml = getFixturePath('file2.yml');

  expect(genDiff(path1yml, path2yml, 'stylish')).toEqual(result);
});

test('Diff of nested objects with plain output', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);
  const result = parse(getFixturePath('result_plain.txt'));

  // Test plain JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, 'plain')).toEqual(result);

  // Test plain YAML
  const path1yml = getFixturePath('file1.yml');
  const path2yml = getFixturePath('file2.yml');

  expect(genDiff(path1yml, path2yml, 'plain')).toEqual(result);
});
