JavaCSript
==========

[![Build Status](https://travis-ci.org/javacsript/javacsript.png)](https://travis-ci.org/ndhoule/javacsript)

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

`grunt test`: Run JSHint and all tests located inside of `./test` ending in
`[Ss]pec.js`.

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
