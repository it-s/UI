module.exports = function(grunt) {

    var appConfig = grunt.file.readJSON('package.json');
    var theme = grunt.file.readJSON(grunt.option('theme') || 'theme.json');
    // Load grunt tasks automatically
    // see: https://github.com/sindresorhus/load-grunt-tasks
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg: appConfig,

        // -- Clean Config ---------------------------------------------------------

        clean: {
            default: ['build/']
        },

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
    
        // -- Angular Annotate Config --------------------------------------------------------
        ngAnnotate: {
            options: {
                singleQuotes: true,
            },
            files: {
                expand: true,
                src   : [
                    'build/ui.js'
                ]
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

        // -- CSSMin Config --------------------------------------------------------

        cssmin: {
            options: {
                noAdvanced: true
            },

            files: {
                expand: true,
                src: 'build/*.css',
                ext: '-min.css'
            }
        },
	
	// -- Uglify Config --------------------------------------------------------
	uglify: {
	    options: {
		sourceMap: true,
		//banner: '/*! <%= appConfig.name %> <%= appConfig.version %> | <%= appConfig.author %> | <%= appConfig.license %> Licensed */'
	    },
	    files: {
		expand: true,
                src: 'build/*.js',
                ext: '-min.js'
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
    	'clean',
        'concat:js',
        'ngAnnotate',
    	'uglify',
        'concat:css',
        'replace',
        'concat:deps',
    	'cssmin'
    ]);
};
