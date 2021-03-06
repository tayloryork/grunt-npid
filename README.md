# grunt-pid-file

> Grunt tasks for pid file management

# Travis-CI
[![Build Status](https://travis-ci.org/tayloryork/grunt-pid-file.png?branch=master)](https://travis-ci.org/tayloryork/grunt-pid-file)

## Getting Started
This plugin requires Grunt `~0.4.2`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-pid-file --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-pid-file');
```

## The "pid-file" task

### Overview
In your project's Gruntfile, add a section named `pidFile` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  pidFile: {
    options: {
      // Task-specific options go here.
    },
    your_target: {
      // Target-specific file lists and/or options go here.
    },
  },
});
```

### Options

#### options.file
Type: `String`
Default value: `.tmp/pid-file.pid'`

A file path that is created when the the task pidFile is ran and deleted when the grunt process exists.

#### options.killIfRunning
Type: `Boolean`
Default value: `false`

If this value is false, and the pid file already exists when the task is ran, the pid file will be updated with the new pid. The previous process ID, if running or stopped, is ignored.
If this value is ture, and the pid file already exists when the task is ran, the process ID in the pid file is read, and then killed with process.kill(pid);.  Then the pid file is updated with the current grunt process.

### Usage Examples

#### Default Options
In this example, running the pidFile task will create a pid file, and delete it when the process exits.
If a long running process, such as `grunt pidFile server` is running, running `grunt pidFile server` again will leave the current server running and try to start a new one. The pid file will be updated with the new process id.

```js
grunt.initConfig({
  pidFile: {
    options: {},
    // Defaults to 
    // file: './tmp/pid-file.pid'
    // killIfRunning : false
  },
});
```

#### Custom Options
A common use case for grunt-pid-file will be to start a grunt server, and kill it later.
Another use case is to start a grunt server, and upon start, kill any previously running grunt servers, and then start a new one.

For example, you start a grunt server with `grunt pidFile server` which will run the grunt tasks `pidFile` (which will create the pid file) and then `server` (which starts a web server and runs forever/untill killed).
Then some time later you start a second grunt process `grunt pidFile server`. This will kill the first server, and start a new one.

Another example, you start a grunt server with `grunt pidFile server`, which will run forever.  Running simply `grunt pidFile` will kill the server.

```js
grunt.initConfig({
  pidFile: {
    options: {
      killIfRunning : true,
    },
    myTask : {
      file : '.tmp/grunt-server.pid',
    },
  },
});
```

## Contributing
Email me/tweet me!

## Release History
_(Nothing yet)_
