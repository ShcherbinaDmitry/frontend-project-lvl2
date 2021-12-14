Проект "Вычислитель отличий".

### Hexlet tests and linter status:
[![Actions Status](https://github.com/ShcherbinaDmitry/frontend-project-lvl2/workflows/hexlet-check/badge.svg)](https://github.com/ShcherbinaDmitry/frontend-project-lvl2/actions)
### Codeclimate maintainability and tests coverage status:
[![Maintainability](https://api.codeclimate.com/v1/badges/3791b66a19f3254ba724/maintainability)](https://codeclimate.com/github/ShcherbinaDmitry/frontend-project-lvl2/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/3791b66a19f3254ba724/test_coverage)](https://codeclimate.com/github/ShcherbinaDmitry/frontend-project-lvl2/test_coverage)
### Github Actions:
[![my-check](https://github.com/ShcherbinaDmitry/frontend-project-lvl2/actions/workflows/my-check.yml/badge.svg)](https://github.com/ShcherbinaDmitry/frontend-project-lvl2/actions/workflows/my-check.yml)

### Install
```
# Clone the repository
git clone https://github.com/ShcherbinaDmitry/frontend-project-lvl2

# Go to the folder with project
cd frontend-project-lvl2

# Install node.js and nvm
nvm install node

# Install dependencies
make install

# Publish gendiff package
make publish
```

### Usage
# Help
To access gendiff help, use console and enter:
```
gendiff -h or gendiff --help
```

To see package version, use console and enter:
```
gendiff -V or gendiff --version
```

# Supported formats
Gendiff supports following formats: '.json', '.yaml', '.yml'.

# How to use
Gendiff is command-line program, which compares two objects, stored in different files and outputs the result of this comparison.

```
gendiff <path to file1> <path to file2>
```
# Format options
Use -f, --format option for different output (optional)
```
gendiff <path to file1> <path to file2>--format stylish (default)/ plain / json
```

### Examples
# Getting version and help of gendiff package
[![asciicast](https://asciinema.org/a/gNDe3q4eEVh1TevomPzGTgOI3.svg)](https://asciinema.org/a/gNDe3q4eEVh1TevomPzGTgOI3)

# Comparing two '.json' files with nested objects
[![asciicast](https://asciinema.org/a/fO5zSHOT3aUuM5xblnk4ck0Du.svg)](https://asciinema.org/a/fO5zSHOT3aUuM5xblnk4ck0Du)

# Comparing two '.yml' files with nested objects
[![asciicast](https://asciinema.org/a/KQCEOO45zr2K1r4z3uaNaXXRs.svg)](https://asciinema.org/a/KQCEOO45zr2K1r4z3uaNaXXRs)

# Comparing files using plain formatter
[![asciicast](https://asciinema.org/a/5HxSSzD6NhLCp2ISGf5mIitlS.svg)](https://asciinema.org/a/5HxSSzD6NhLCp2ISGf5mIitlS)

# Comparing files using JSON formatter
[![asciicast](https://asciinema.org/a/eFG3czJetYODCy4oGcvOVAH5P.svg)](https://asciinema.org/a/eFG3czJetYODCy4oGcvOVAH5P)
