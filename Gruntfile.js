'use strict';

module.exports = function(grunt) {

  const gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  
  grunt.initConfig(gruntConfig);
 
  /* Default tasks for development */
  grunt.registerTask('default', [
    'dev',
    'connect:dev',
    'watch'
  ]);

  /* Build development library */
  grunt.registerTask('dev', [
    'clean',
    'browserify',
  ]);

  /* Build distribution library */
  grunt.registerTask('build', [
    'dev',
    'uglify',
  ]);

  /* Starts distibution server */
  grunt.registerTask('dist', [
    'build',
    'connect:dist'
  ]);
};
