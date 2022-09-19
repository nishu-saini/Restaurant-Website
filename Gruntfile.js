'use strict';

module.exports = function (grunt) {
    // Time how long tasks take, can help when optimizing build time...
    require('time-grunt')(grunt);
    // Automatically load required grunt tasks..
    require('jit-grunt')(grunt, {
        useminPrepare: 'grunt-usemin'
    });

    // Define configuration for all the tasks..
    grunt.initConfig({
        sass: {
            dist: {
                files: {
                    'css/styles.css': 'css/styles.scss'
                }
            }
        },
        watch: {
            files: 'css/*.scss',
            tasks: ['sass']
        },
        browserSync: {
            dev: {
                bsFiles: {
                    src: [
                        'css/*.css',
                        '*.html',
                        'js/*.js'
                    ]
                }
            }
        },
        copy: {
            html: {
                files: [
                    {
                        //for html..
                        expand: true,
                        dont: true,
                        cwd: './',
                        src: ['*.html'],
                        dest: 'dist'
                    }]
            },
            fonts: {
                files: [
                    {
                        // for font-awesome..
                        expand: true,
                        dot: true,
                        cwd: 'node_modules/font-awesome',
                        src: ['fonts/*.*'],
                        dest: 'dist'
                    }]
            }
        },
        clean: {
            build: {
                src: ['dist/']
            }
        },
        imagemin: {
            dynamic: {
                files: [{
                    expand:true,
                    cwd:'./',
                    src: ['img/*.{png,jpg,gif}'],
                    dest: 'dist/'
                }]
            }
        },
        useminPrepare: {
            foo: {
                dest: 'dist',
                src:['contact.html', 'aboutus.html', 'index.html']
            },
            options: {
                flow: {
                    steps: {
                        css: ['cssmin'],
                        js: ['uglify']
                    }
                },
                post: {
                    css: [{
                        name: 'cssmin',
                        createConfig: function (context, block) {
                            var generated = context.options.generated;
                            generated.options = {
                                keepSpecialComments: 0, rebase: false
                            };
                        }
                    }]
                }
            }
        },
        // concat..
        concat: {
            options: {
                separator: ';'
            },
            // dist configuration is provided by useminPrepare..
            dist: {}
        },
        // uglify..
        uglify: {
            //dist configuration provided by useminPrepare..
            dist: {}
        },
        cssmin: {
            dist: {}
        },
        // filerev..
        filerev: {
            options: {
                encoding: 'utf8',
                algorithm: 'md5',
                length: 20
            },
            release: {
                // filerev: release hashes(md5) all assets (images, js and css)
                // in dist directory..
                files: [{
                    src: [
                        'dist/js/*.js',
                        'dist/css/*.css'
                    ]
                }]
            }
        },

        // usemin
        // Replaces all assets with their revved version in html and css file.
        usemin: {
            html: ['dist/contact.html', 'dist/aboutus.html', 'dist/index.html'],
            options: {
                assetDirs: ['dist', 'dist/css', 'dist/js']
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true
                },
                files: {
                    'dist/index.html': 'dist/index.html',    // 'destination': 'source'
                    'dist/contactus.html': "dist/contactus.html",
                    'dist/aboutus.html': 'dist/aboutus.html'
                }
            }
        },

        options: {
            watchTask: true,
            server: {
                baseDir: "./"
            }
        }

    });

    grunt.registerTask('css', ['sass']);
    grunt.registerTask('default', ['browserSync', 'watch']);
    grunt.registerTask('build', [
        'clean',
        'copy',
        'imagemin',
        'useminPrepare',
        'concat',
        'cssmin',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin'
    ]);

};

