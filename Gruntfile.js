/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    // Metadata.
    pkg: grunt.file.readJSON('package.json'),
    banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
      '<%= grunt.template.today("yyyy-mm-dd") %>\n' +
      '<%= pkg.homepage ? "* " + pkg.homepage + "\\n" : "" %>' +
      '* Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author.name %>;' +
      ' Licensed <%= pkg.licenses %> */\n',
    // Task configuration.
    concat: {
      options: {
        banner: '<%= banner %>',
        stripBanners: true,
        separator: ';\n'
      },
      source: {
        src: [
            "js/jr.utils.js",
            "js/jquery.jr.ft.js",
            "js/jquery.jr.pagemanager.js",
            "js/jquery.jr.paginationstatus.js",
            "js/jquery.jr.pageturnsensor.js",
            "js/jquery.jr.pageprogressbar.js",
            "js/jquery.jr.links.js",
            "js/jquery.jr.historykeeper.js",
            "js/jquery.jr.objectbox.js",
            "js/jquery.jr.switcher.js",
            "js/jquery.jr.panel.js",
            "js/jquery.jr.panel.typo.js",
            "js/jquery.jr.panel.cmap.js",
            "js/jquery.jr.panel.istrip.js",
            "js/jquery.jr.fip.js",
            "js/jats.reader.js"
        ],
        dest: 'dist/<%= pkg.name %>.js'
      },
      lib: {
        src: [
            "lib/js/jquery-1.7.2.js",
            "lib/js/modernizr.jr.js",
            "lib/js/jquery.throttle.js",
            "lib/js/jquery.mousewheel.js",
            "lib/js/rangeinput.js",
            "lib/js/jquery.touchSwipe.js",
            "lib/js/jquery.hoverIntent.js",
            "lib/js/figpopup.js"
        ],
        dest: 'dist/<%= pkg.name %>-lib.js'
      }
    },
    uglify: {
      options: {
        banner: '<%= banner %>',
        mangle: true,
        compress: true,
        sourceMap: true
      },
      source: {
        src: '<%= concat.source.dest %>',
        dest: 'dist/<%= pkg.name %>.min.js'
      },
      lib: {
        src: '<%= concat.lib.dest %>',
        dest: 'dist/<%= pkg.name %>-lib.min.js'
      }
    },
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        browser: true,
        globals: {
          jQuery: true
        }
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      lib_test: {
        src: ['lib/**/*.js', 'test/**/*.js']
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib_test: {
        files: '<%= jshint.lib_test.src %>',
        tasks: ['jshint:lib_test', 'qunit']
      }
    }
  });

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  //grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);
  grunt.registerTask('default', ['concat', 'uglify']);

};
