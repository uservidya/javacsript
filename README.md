JavaCSript &nbsp;&nbsp;&nbsp; [![Build Status](https://travis-ci.org/ndhoule/javacsript.png)](https://travis-ci.org/ndhoule/javacsript) [![Coverage Status](https://coveralls.io/repos/ndhoule/javacsript/badge.png)](https://coveralls.io/r/ndhoule/javacsript)
==========

Computer science fundamentals implemented in JavaScript.

## File Structure

You can find all source files in `src` and all tests in `test/unit`. The files
contained in `test/config` set up things like coverage, unboxing Chai globally,
etc.

## Testing

This repo uses Grunt to run tests. To install all required dependencies, run:

```sh
sudo npm install -g grunt-cli
npm install
```

### Grunt Tasks

`grunt dev`: Run JSHint, tests located inside of `./test` ending in
`[Ss]pec.js`, and run and open an HTML coverage report.

`grunt watch`: Run `grunt test` and `grunt spec` after edits to any source or
test file.

### Precommit Hooks

Run `bin/git-hooks` to enable pre-commit testing. This will prevent you from
committing if you have failing specs. If you need to override the commit tests,
run `git commit` with the `-n` flag.

## Credits

Parts of this repository follow Nicholas C. Zakas'
[Computer Science in JavaScript](https://github.com/nzakas/computer-science-in-javascript)
series.
