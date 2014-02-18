module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON("package.json"),
		uglify: {
			options: {
				banner: "/* ==================================================\n * chumenwenwen.js v3.0\m * Copyright 2013 Mobvoi, Inc.\n * ==================================================\n * Edited by Season Li @ season.li@mobvoi.com\n * Version 3.0 revised at <%= grunt.template.today('yyyy-mm-dd') %>\n * ==================================================*/\n"
			},
			build: {
				src: "js/chumenwenwen.3.0.js",
				dest: "js/build/chumenwenwen.3.0.min.js"
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-uglify");

	grunt.registerTask("default", ["uglify"]);
}