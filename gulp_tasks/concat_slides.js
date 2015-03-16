var readJSON = require('readjson');

function concat_slides() {

	readJSON('./slides/slides.json', function(error, json) {
		if (error)
			console.error(error.message);
		else if(json.slides)
			injectFiles(json.slides);
	});

	function injectFiles(slides) {

		var slidesPaths = [];

		slides.forEach(function(slideFileName){
			slidesPaths.push("./slides/"+slideFileName+".html");
		});

		var slidesStream = gulp.src(slidesPaths);

		gulp.src("./src/all_slides.html")
			.pipe($.inject(slidesStream,{
				name: "slides",
				transform: function (filePath, file) {
					return file.contents.toString("utf8");
				}
			}))
			.pipe(gulp.dest("./slides/concat/"))
	}
}

module.exports = concat_slides;