import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parsers';
import formatter from '../src/formatters/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Diff with no format', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'plain', filename);
  const result = 'Choose correct format (stylish, plain or json)';

  // Test plain JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, '')).toEqual(result);

  // Test plain YAML
  const path1yml = getFixturePath('file1.yml');
  const path2yml = getFixturePath('file2.yml');

  expect(genDiff(path1yml, path2yml, '')).toEqual(result);
});

test('Plain format with wrong objects', () => {
  const incorrectObj = { common: { key1: 'Value1', key2: 'Value2', type: 'Incorrect' } };
  const result = 'Something went wrong';

  expect(formatter(incorrectObj, 'plain')).toEqual(result);
});

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

test('Diff of nested object with json output', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);
  const result = '{"common":{"children":{"follow":{"newValue":false,"type":"added"},"setting1":{"oldValue":"Value 1","type":"unchanged"},"setting2":{"oldValue":200,"type":"removed"},"setting3":{"newValue":null,"oldValue":true,"type":"updated"},"setting4":{"newValue":"blah blah","type":"added"},"setting5":{"newValue":{"key5":"value5"},"type":"added"},"setting6":{"children":{"doge":{"children":{"wow":{"newValue":"so much","oldValue":"","type":"updated"}},"type":"object"},"key":{"oldValue":"value","type":"unchanged"},"ops":{"newValue":"vops","type":"added"}},"type":"object"}},"type":"object"},"group1":{"children":{"baz":{"newValue":"bars","oldValue":"bas","type":"updated"},"foo":{"oldValue":"bar","type":"unchanged"},"nest":{"newValue":"str","oldValue":{"key":"value"},"type":"updated"}},"type":"object"},"group2":{"oldValue":{"abc":12345,"deep":{"id":45}},"type":"removed"},"group3":{"newValue":{"deep":{"id":{"number":45}},"fee":100500},"type":"added"}}';

  // Test plain JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, 'json')).toEqual(result);

  // Test plain YAML
  const path1yml = getFixturePath('file1.yml');
  const path2yml = getFixturePath('file2.yml');

  expect(genDiff(path1yml, path2yml, 'json')).toEqual(result);
});
