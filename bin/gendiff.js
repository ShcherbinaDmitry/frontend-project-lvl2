#!/usr/bin/env node
import { Command } from 'commander';
import genDiff from '../src/index.js';

// Creating new CLI command
const program = new Command();

// Setting up arguments for command
program.arguments('<filepath1> <filepath2>');

// Setting up options, version and description
program.version('0.0.1', '-V, --version', 'output the version number');
program.description(' Compares two configuration files and shows a difference.');
program.option('-f, --format[type]', 'output format');

// Reading files and compare objects
program.action((filepath1, filepath2) => {
  console.log(genDiff(filepath1, filepath2));
});

// Parse for arguments;
program.parse(process.argv);
