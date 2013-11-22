/*jshint -W079*/
// Ignore global _ redefinition in test/config/setup.js for JSHint

'use strict';

module.exports = function(grunt) {
  require('load-grunt-tasks')(grunt);

  var files = {
    grunt: 'Gruntfile.js',
    testConfig: 'test/config/**/*.js',
    test: 'test/unit/**/*[Ss]pec.js',
    src: 'src/**/*.js'
  };

  // Project configuration.
  grunt.initConfig({
    meta : {
      pkg : grunt.file.readJSON('package.json')
    },

    connect: {
      options: {
        port: 9000,
        hostname: 'localhost'
      },
      coverage: {
        options: {
          open: 'http://<%= connect.options.hostname %>:<%= connect.options.port %>/coverage.html'
        }
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'min',
          require: ['test/config/setup', 'test/config/coverage']
        },
        src: [files.test]
      },
      coverage: {
        options: {
          reporter: 'html-cov',
          quiet: true,
          captureFile: 'coverage.html'
        },
        src: [files.test]
      },
      'travis-cov': {
        options: {
          reporter: 'travis-cov'
        },
        src: [files.test]
      }
    },

    jshint: {
      options: {
        reporter: require('jshint-stylish')
      },
      test: {
        options: {
          jshintrc: 'test/.jshintrc'
        },
        files: {
          src: [files.test, files.testConfig]
        }
      },
      src: {
        options: {
          jshintrc: '.jshintrc'
        },
        files: {
          src: [files.grunt, files.src]
        }
      }
    },

    watch: {
      gruntfile: {
        files: [files.grunt],
        tasks: ['jshint']
      },
      test: {
        files: [files.testConfig, files.test, files.src],
        tasks: ['test']
      }
    },

    concurrent: {
      options: {
        logConcurrentOutput: true
      },
      dev: [
        'connect:coverage:keepalive',
        'watch'
      ]
    }
  });

  // Tasks
  grunt.registerTask('test', [
    'jshint',
    'mochaTest'
  ]);

  grunt.registerTask('dev', [
    'concurrent:dev'
  ]);

  // Runs just before a commit. Don't put tasks that generate files here as
  // they won't be included in your commit.
  grunt.registerTask('precommit', ['test']);

  // Default task (runs when running `grunt` without arguments)
  grunt.registerTask('default', ['test']);
};
