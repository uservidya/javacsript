JavaCSript
==========
A terrible name for computer science fundamentals implemented using JavaScript.


## File Structure
You can find all source files in `src` and all tests in `test/unit`.
`test/setup.js` contains all setup work for globals, including unboxing and
requiring Chai, providing useful functions, etc.


## Testing
This repo uses Grunt to run tests. To install all required dependencies, run:

```sh
sudo npm install -g grunt-cli
npm install
```

### Grunt Tasks
`grunt test`: Run all tests ending in `Spec.js` located inside `./test`.

`grunt lint`: Run JSHint on source and test files.

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
