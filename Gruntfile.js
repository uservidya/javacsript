/*jshint -W079 */
// Ignore lodash redef here; JSHint dislikes the runner.js global _ definition

var _ = require('lodash');

module.exports = function(grunt) {
  'use strict';

  var files = {
    grunt: 'Gruntfile.js',
    tests: 'test/unit/**/*Spec.js',
    src: 'src/**/*.js'
  };

  // Project configuration.
  grunt.initConfig({
    meta : {
      pkg : grunt.file.readJSON('package.json')
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'min',
          require: 'test/runner'
        },
        src: [files.tests]
      }
    },

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      all: _.toArray(files)
    },

    watch: {
      gruntfile: {
        files: 'Gruntfile',
        tasks: ['lint']
      },
      tests: {
        files: [files.tests, files.src],
        tasks: ['test', 'lint']
      }
    }
  });

  // On watch events, configure jshint:all to run only on changed file
  grunt.event.on('watch', function(action, filepath) {
    grunt.config(['jshint', 'all'], filepath);
  });

  // Load third-party modules
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-notify');

  // Tasks
  grunt.registerTask('lint', ['jshint:all']);
  grunt.registerTask('test', ['mochaTest']);

  // Runs just before a commit. Don't put tasks that generate files here as
  // they won't be included in your commit.
  grunt.registerTask('precommit', ['test', 'lint']);

  // Default task (runs when running `grunt` without arguments)
  grunt.registerTask('default', ['test']);
};
