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
          'src/common/fastclick.js',
          'src/app/**/*.js' // All the js in app folder
        ],
        dest: 'src/app.js',
      }
    },

    watch: {
      scripts: {
        files: ['Gruntfile.js',
                'src/index.html',
                'src/styles/**',
                'src/app/**'],
        tasks: ['concat', 'compass', 'cssmin', 'clean:phonegap', 'copy:phonegap'],
        options: {
          spawn: false,
          hostname: 'localhost',
          livereload: '<%= connect.options.livereload %>',
        },
      } 
    },

    //starts a server and enables livereload
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

    //copy and clean are used for the build process
    copy: {
      build: {
        cwd: 'src',
        src: [ 
          'app/**/*.html',
          'assets/**',
          'app.js',
          'styles.min.css',
          'index.html'
        ],
        dest: 'dist',
        expand: true
      },
      phonegap: {
        cwd: 'src',
        src: [ 
          'app/**/*.html',
          'assets/**',
          'app.js',
          'styles.min.css',
          'index.html'
        ],
        dest: 'phonegap/www',
        expand: true
      }
    },

    clean: {
      build: {
        src: [ 'dist' ]
      },
      phonegap: {
        src: [ 'phonegap/www']
      }
    },

    compass: {                  // Task
      dist: {                   // Target
        options: {              // Target options
          sassDir: 'src/styles/sass',
          cssDir: 'src/styles/css'
        }
      }
    },

    cssmin: {
      add_banner: {
        options: {
          banner: '/* vci minified css file */'
        },
        files: {
          'src/styles.min.css': ['src/styles/css/main.css']
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-watch');


  grunt.registerTask('default', [
    'concat', 
    'connect', 
    'compass', 
    'cssmin', 
    'clean:phonegap', 
    'copy:phonegap', 
    'watch']);
  grunt.registerTask('build', ['concat', 'clean:build', 'copy:build']);

};