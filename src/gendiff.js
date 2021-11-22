#!/usr/bin/env node
import { Command } from 'commander';
import _ from 'lodash';
import path from 'path';
import fs from 'fs';

// Creating new CLI command
const genDiff = new Command();

// Setting up arguments for command
genDiff.arguments('<filepath1> <filepath2>');

// Setting up options, version and description
genDiff.version('0.0.1', '-V, --version', 'output the version number');
genDiff.description(' Compares two configuration files and shows a difference.');
genDiff.option('-f, --format[type]', 'output format');

// Reading files and compare objects
genDiff.action((filepath1, filepath2) => {
  const path1 = path.resolve(process.cwd(), 'files', filepath1);
  const path2 = path.resolve(process.cwd(), 'files', filepath2);

  const obj1 = JSON.parse(fs.readFileSync(path1, 'utf-8'));
  const obj2 = JSON.parse(fs.readFileSync(path2, 'utf-8'));

  const merge = { ...obj1, ...obj2 };

  const arr = Object.entries(merge)
    .sort()
    .map(([key, value]) => {
      if (_.isUndefined(obj1[key])) return `+ ${key}: ${value}`;
      if (_.isUndefined(obj2[key])) return `- ${key}: ${value}`;
      if (obj1[key] !== value) return `- ${key}: ${obj1[key]}\n+ ${key}: ${obj2[key]}`;
      return `  ${key}: ${value}`;
    });

  const str = `{\n${arr.join('\n')}\n}`;

  console.log(str);

  return str;
});

// Parse for arguments;
genDiff.parse(process.argv);

export default genDiff;
