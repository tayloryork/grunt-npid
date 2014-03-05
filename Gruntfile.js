/*
 * grunt-npid
 * https://github.com/tyork/grunt-npid
 *
 * Copyright (c) 2014 tayloryork
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>',
      ],
      options: {
        jshintrc: '.jshintrc',
      },
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['.tmp/*'],
    },
    
    // create tmp dirs
    mkdir: {
      all: {
        options: {
          create: ['.tmp']
        },
      },
    },

    // Configuration to be run (and then tested).
    npid: {
      default_options: {
        // killIfRunning: false
        // file: .tmp/npid.pid
        options: {},
      },
      custom_options: {
        options: {
          killIfRunning : true,
          file : '.tmp/custom_options.pid'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js'],
    },

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');
  grunt.loadNpmTasks('grunt-mkdir');
  
  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'mkdir', 'npid', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
