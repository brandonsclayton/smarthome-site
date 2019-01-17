'use strict';

module.exports = function(grunt) {

  const gruntConfig = require('./gruntconfig');

  gruntConfig.tasks.forEach(grunt.loadNpmTasks);
  
  grunt.initConfig(gruntConfig);
  
  grunt.registerTask('default', ['clean', 'browserify', 'connect:dev', 'watch']);

  grunt.registerTask('build', ['clean', 'browserify']);

  grunt.registerTask('heroku', ['clean', 'browserify', 'connect:heroku']);
};
