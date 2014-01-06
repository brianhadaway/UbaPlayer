/*global module:false*/
module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        meta: {
            banner: '/*! <%= pkg.title || pkg.name %> - v<%= pkg.version %> - ' +
                '<%= pkg.homepage ? " * " + pkg.homepage + "\\n " : "" %>' +
                '* Copyright (c) <%= grunt.template.today(" yyyy ") %> <%= pkg.author.name %>;' +
                ' Licensed <%= pkg.license.type %> */'
        },
        concat: {
            options: {
                separator: ';',
                banner: '<%= meta.banner %>'
            },
            dist: {
                src: ['src/jquery.ubaplayer.js'],
                dest: 'dist/<%= pkg.name %>.js'
            }
        },
        qunit: {
            files: ['test/**/*.html']
        },
        watch: {
            files: 'src/jquery.ubaplayer.js',
            tasks: ['jshint']
        },
        jshint: {
            files: ['Gruntfile.js', 'src/**/*.js', 'test/**/*.js'],
            options: {
                curly: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                boss: true,
                eqnull: true,
                browser: true,
                globals: {
                    jQuery: true,
                    $: true,
                    swfobject: true
                }
            },
        },
        uglify: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {
                files: {
                    'dist/<%= pkg.name %>.min.js': ['<%= concat.dist.dest %>']
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // Default task.
    grunt.registerTask('default', [
        'jshint',
        //'qunit',
        'concat',
        'uglify'
    ]);

};