module.exports = function(grunt) {

    var appConfig = grunt.file.readJSON('package.json');
    var theme = grunt.file.readJSON('theme.json');
    // Load grunt tasks automatically
    // see: https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: appConfig,

        // -- Concat Config --------------------------------------------------------
        concat: {
            options: {
                stripBanners: true
            },
            js: {
                options: {
                    stripBanners: false,
                    separator: ';',
                    banner: ';(function(angular, undefined) {\n\'use strict\'\n',
                    footer: '\n})(window.angular);'
                },
                files: [{
                    'build/ui.js': [
                        './src/ui.js',
                        './src/*.js'
                    ]
                }]
            },
            css: {
                options: {
                    stripBanners: true
                },
                files: [{
                    'build/ui.css': [
                        './src/*.css'
                    ]
                }]
            },
            deps: {
                options: {
                    stripBanners: true
                },
                files: [{
                    'build/ui.js': [
                        './node_modules/ng-dialog/js/ngDialog.js',
                        './build/ui.js'
                    ]
                }, {
                    'build/ui.css': [
                        './node_modules/ng-dialog/css/ngDialog.css',
                        './node_modules/ng-dialog/css/ngDialog-theme-default.css',
                        './build/ui.css'
                    ]
                }]
            }
        },

        // -- Replace Config -------------------------------------------------------

        replace: {
            colors: {
                src: ['./build/ui.css'], // source files array (supports minimatch)
                dest: './build/', // destination directory or file
                replacements: theme.colors
            }
        },

        // -- Watch JS SRC for changes ---------------------------------------------------------
        watch: {
            files: [
                './src/*.js'
            ],
            tasks: ['default'],
            options: {
                interrupt: true,
                spawn: false,
            }
        }

    });

    grunt.registerTask('watch', [
        'watch'
    ]);

    grunt.registerTask('default', [
        'concat:js',
        'concat:css',
        'replace',
        'concat:deps'
    ]);
};
