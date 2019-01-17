'use strict';

module.exports = function(grunt) {

  const gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  
  grunt.initConfig(gruntConfig);
  
  grunt.registerTask('default', ['clean', 'browserify', 'connect', 'watch']);
};
