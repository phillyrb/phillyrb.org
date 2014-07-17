// Karma configuration
// Generated on Thu Jul 17 2014 11:53:41 GMT-0400 (EDT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine', 'requirejs'],


    // list of files / patterns to load in the browser
    files: [
      { pattern: 'bower_components/jquery/jquery.js', included: false },
      { pattern: 'bower_components/moment/moment.js', included: false },
      { pattern: 'bower_components/underscore/underscore.js', included: false },
      { pattern: 'source/javascripts/**/*.js', included: false },
      { pattern: 'spec/javascripts/**/*.js', included: false },
      'spec/test-main.js'
      /*
      'bower_components/jquery/jquery.js',
      'bower_components/moment/moment.js',
      'bower_components/underscore/underscore.js',
      'test-main.js',
      'source/javascripts/*.js',
      'spec/javascripts/*.js'
      */
    ],


    // list of files to exclude
    exclude: [
      'source/javascripts/all.js'
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
      // source files, that you wanna generate coverage for
      // do not include tests or libraries
      // (these files will be instrumented by Istanbul)
      'source/javascripts/*.js': ['coverage']
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress', 'coverage'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS', 'Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};