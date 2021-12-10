import { expect, test } from '@jest/globals';
import { fileURLToPath } from 'url';
import path from 'path';
import genDiff from '../src/index.js';
import parse from '../src/parsers';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

test('Diff plain objects', () => {
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

test('Diff with stylish output', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);
  const result = parse(getFixturePath('result.txt'));

  // Testing nested JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, 'stylish')).toEqual(result);

  // Testing nested YAML
  const path1 = getFixturePath('file1.json');
  const path2 = getFixturePath('file2.json');

  expect(genDiff(path1, path2, 'stylish')).toEqual(result);
});

test('Diff with plain output', () => {
  const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', 'nested', filename);

  const result = `
Property 'common.follow' was added with value: false
Property 'common.setting2' was removed
Property 'common.setting3' was updated. From true to null
Property 'common.setting4' was added with value: 'blah blah'
Property 'common.setting5' was added with value: [complex value]
Property 'common.setting6.doge.wow' was updated. From '' to 'so much'
Property 'common.setting6.ops' was added with value: 'vops'
Property 'group1.baz' was updated. From 'bas' to 'bars'
Property 'group1.nest' was updated. From [complex value] to 'str'
Property 'group2' was removed
Property 'group3' was added with value: [complex value]
`;

  // Test plain JSON
  const path1json = getFixturePath('file1.json');
  const path2json = getFixturePath('file2.json');

  expect(genDiff(path1json, path2json, 'plain')).toEqual(result);

  // Test plain YAML
  const path1yml = getFixturePath('file1.yml');
  const path2yml = getFixturePath('file2.yml');

  expect(genDiff(path1yml, path2yml, 'plain')).toEqual(result);
});
