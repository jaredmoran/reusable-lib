/*global module:false*/
module.exports = function ( grunt ) {
	
	// Project configuration.
	grunt.initConfig({
		// Variables
		js_root: "resources/public/js/",
		sass_root: "resources/public/sass/",
		compass_path: "resources/public",
		compass_config: "<%= compass_path %>/config.rb",
		
		// Metadata.
		meta: {
			version: "0.1.0"
		},
		
		banner:
			"/*!\n" +
			" * \n" +
			" * Nike Evo - v<%= meta.version %> - <%= grunt.template.today('yyyy-mm-dd') %>\n" +
			" * @author: Instrument\n" +
			" * @url: http://weareinstrument.com/\n" +
			" * Copyright (c) <%= grunt.template.today('yyyy') %>\n" +
			" * Instrument; Licensed MIT\n" +
			" * \n" +
			" */\n",
			
		// Task configuration.
		concat: {
			options: {
				banner: "<%= banner %>",
				stripBanners: true
			},
			dist: {
				src: [
					"<%= js_root %>support.js",
					"<%= js_root %>vendor/*",
					"<%= js_root %>lib/*",
					"<%= js_root %>app.js",
					"<%= js_root %>app/*"
				],
				dest: "<%= js_root %>dist/scripts.js"
			}
		},
		
		uglify: {
			options: {
				banner: "<%= banner %>"
			},
			dist: {
				src: "<%= concat.dist.src %>",
				dest: "<%= js_root %>dist/scripts.js"
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
					$: true,
					jQuery: true,
					console: true
				}
			},
			gruntfile: {
				src: "Gruntfile.js"
			}
		},
		
		watch: {
			gruntfile: {
				files: ["<%= jshint.gruntfile.src %>"],
				tasks: ["jshint:gruntfile"]
			},
			scripts: {
				files: ["<%= concat.dist.src %>"],
				tasks: ["concat"]
			},
			styles: {
				files: ["<%= sass_root %>**/*.scss"],
				tasks: ["compass:development"]
			}
		},
		
		compass: {
			development: {
				options: {
					basePath: "<%= compass_path %>",
					config: "<%= compass_config %>",
					environment: "development"
				}
			},
			production: {
				options: {
					basePath: "<%= compass_path %>",
					config: "<%= compass_config %>",
					environment: "production"
				}
			}
		}
	});
	
	// These plugins provide necessary tasks.
	grunt.loadNpmTasks( "grunt-contrib-concat" );
	grunt.loadNpmTasks( "grunt-contrib-uglify" );
	grunt.loadNpmTasks( "grunt-contrib-qunit" );
	grunt.loadNpmTasks( "grunt-contrib-jshint" );
	grunt.loadNpmTasks( "grunt-contrib-watch" );
	grunt.loadNpmTasks( "grunt-contrib-compass" );
	
	// Production/Staging deploy task.
	grunt.registerTask( "deploy", ["uglify", "compass:production"] );
	
	// Development build task.
	grunt.registerTask( "build", ["concat", "compass:development"] );
	
	// Check jshint task.
	grunt.registerTask( "hint", ["jshint"] );
	
	// Check uglify task.
	grunt.registerTask( "ugly", ["jshint"] );
	
};