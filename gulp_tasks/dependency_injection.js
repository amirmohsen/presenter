var bowerFiles = require("main-bower-files"),
	watchFiles = [
		"./bower.json",
		"./styles/*.{html,css}",
		"./app/elements/**/*.html"
	];

function dependency_injection() {

	inject();

	$.watch(watchFiles, inject);
	
	function inject() {
		gulp.src("./src/importer.html")
			.pipe($.inject(gulp.src(bowerFiles(), {read: false}), {name: "bower"}))
			.pipe($.inject(gulp.src("./app/elements/**/*.html", {read: false}), {name: "elements"}))
			.pipe($.inject(gulp.src("./app/styles/*.{html,css}", {read: false}), {name: "styles"}))
			.pipe(gulp.dest("./app/"));
	}
}

module.exports = dependency_injection;