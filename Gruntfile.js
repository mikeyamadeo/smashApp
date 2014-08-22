module.exports = function(grunt) {


  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    concat: {
      dist: {
        src: [
          'src/common/angular/angular.min.js',
          'src/common/angular-ui-router/release/angular-ui-router.min.js',
          'src/common/polyfill/Array.prototype.find.js',
          'src/app/**/*.js' // All the js in app folder
        ],
        dest: 'src/app.js',
      }
    },

    watch: {
      scripts: {
        files: ['Gruntfile.js',
                'src/index.html',
                'src/app/**/*.js'],
        tasks: ['concat'],
        options: {
          spawn: false,
          hostname: 'localhost',
          livereload: '<%= connect.options.livereload %>',
        },
      } 
    },

    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729
      },
      livereload: {
        options: {
          open: true,
          base: [
            'src'
          ]
        }
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/* vci minified css file */'
        },
        files: {
          'www/styles.min.css': ['www/styles.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', ['concat', 'connect', 'watch']);

};