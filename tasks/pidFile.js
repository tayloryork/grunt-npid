/*
 * grunt-npid
 * https://github.com/tyork/grunt-npid
 *
 * Copyright (c) 2014 tayloryork
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  grunt.registerMultiTask('pidFile', 'Grunt tasks for pid file management', function (target) {
    var file = this.options().file  || ".tmp/pid-file.pid";
    var killIfRunning = this.options().killIfRunning || false;
    var runningProcessPid = null;
    
    grunt.log.debug("Target: " + target + " File: " + this.options().file + " killIfRunning: " + this.options().killIfRunning);
    
    if(killIfRunning) {
      try {
        runningProcessPid = grunt.file.read(file);
      } catch (err){
        // Do nothing, it does not exist
      }
      try {
        if(runningProcessPid) {
          grunt.log.write('Killing process ' + runningProcessPid);
          process.kill(runningProcessPid);
        }
      } catch (err) {
        grunt.log.error(err);
        process.exit(1);
      }
    }
    
    try {
      var npid = require('npid');
      var path = require('path');
      grunt.log.writeln("Writing PID to %s", file);
      var dirname = path.dirname(file);
      grunt.log.writeln("Directory of PID file: ", dirname);
      if(!grunt.file.exists(dirname)){
        grunt.file.mkdir(dirname);
      }
      npid.create(file, true);
    } catch (err) {
      grunt.log.error(err);
      process.exit(1);
    }
  });
  
  grunt.registerTask('test', [
    'clean:server',
    'concurrent:test',
    'autoprefixer',
    'connect:test',
    'karma'
  ]);
};
