JavaCSript
==========

A terrible name for computer science fundamentals implemented using JavaScript!
Also includes tests to reveal any miserable failure or glorious success.

Parts of this repository follow Nicholas C. Zakas'
[Computer Science in JavaScript](https://github.com/nzakas/computer-science-in-javascript)
series.

Using the Test Suite
--------------------
This repo uses Grunt to run tests. To install all required dependencies, run:

    sudo npm install -g grunt-cli
    npm install

To run tests, run `npm test`.

### Automatic Testing

Optionally, run `./git-hooks` to enable pre-commit testing. Be warned: This will
prevent you from committing if you have failing specs. If you need to override
the tests to commit for some reason, run `git commit` with the `-n` flag.
