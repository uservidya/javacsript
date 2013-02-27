module.exports = function(grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({
    meta : {
      pkg : grunt.file.readJSON('package.json'),
      src : ['sorting/**/*.js']
    },
    buster: {
      test: {
        config: 'spec/buster.js'
      }
    },
    jshint: {
      all: [
        '<%= meta.src %>'
      ]
    }
  });

  // Load third-party modules
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-buster');

  // Define tasks
  grunt.registerTask('test', ['jshint:all', 'buster:test']);
  grunt.registerTask('precommit', ['jshint:all', 'buster:test']);

  // Define default task
  grunt.registerTask('default', ['test']);
};
