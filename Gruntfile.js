/**
 * Created by sam on 16-12-13.
 */
module.exports = function (grunt) {
    var sassStyle = 'expanded';
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            options: {
                style: sassStyle
            },
            dist: {
                files: [{
                    src: 'src/sass/style.scss',
                    dest: 'build/css/style.min.css'
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            dist: {
                files: [{
                    src:['src/js/plugin1.js','src/js/plugin2.js','src/js/add.js','src/js/index.js'],
                    dest: 'build/js/global.js'
                }]
            }
        },
        uglify: {
            options: {
                banner: '/*!<%= pkg.name%> <%= grunt.template.today("yyyy-mm-dd") %>*/\n',
            },
            dist: {
                files: [{
                    src: 'src/js/add.js',
                    dest: 'build/js/add.min.js'
                },{
                    src: 'build/js/global.js',
                    dest: 'build/js/global.min.js'
                }]
            }
        },
        // jshint: {
        //     all:['build/js/*.js']
        // },
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                // keepalive: true
                livereload: 35729,
                base: '.'
            },
            all: {
                options: {
                    open: true,
                    base: [
                        '.'
                    ]
                }
            }
        },
        watch: {
            javascripts: {
                files: ['src/js/plugin1.js','src/js/plugin2.js','src/js/*.js'],
                tasks: ['concat','uglify']
            },
            style: {
                files: ['src/sass/style.scss'],
                tasks: ['sass']
            },
            livereload: {
                files: ['./index.html'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-connect'); //open a static server
    grunt.loadNpmTasks('grunt-contrib-watch');

    grunt.registerTask('default',['concat','uglify','sass']);
    grunt.registerTask('serve',['connect:all','watch']);
};
