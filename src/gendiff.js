import { Command } from 'commander';

// Creating new CLI command
const genDiff = new Command();

// Setting up arguments for command
genDiff.argument('<filepath1> <filepath2>');

// Setting up options, version and description
genDiff.version('0.0.1', '-V, --version', 'output the version number');
genDiff.description(' Compares two configuration files and shows a difference.');
genDiff.option('-f, --format[type]', 'output format');

// Parse for arguments;
genDiff.parse(process.argv);

export default genDiff;
