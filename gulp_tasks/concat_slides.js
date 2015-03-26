var 
	readJSON = require('readjson'),
	vars = {
		assets: "./slides/assets"
	};

function concat_slides() {

	concat();

	gulp.watch("./slides/*.{html,json}", concat);

	function concat() {

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

			var slidesStream = gulp.src(slidesPaths).pipe($.mustache(vars));

			gulp.src("./src/all_slides.html")
				.pipe($.inject(slidesStream,{
					name: "slides",
					transform: function (filePath, file) {
						return file.contents.toString("utf8");
					}
				}))
				.pipe(gulp.dest("./slides/concat/"));
		}
	}
}

module.exports = concat_slides;