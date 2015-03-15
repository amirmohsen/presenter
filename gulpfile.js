global.gulp = require("gulp");
global.$ = require('gulp-load-plugins')();

var requireDir = require("require-dir"),
	gulpTasks = requireDir("./gulp_tasks"),
	tasks = [];

for(var task in gulpTasks) {
	gulp.task(task, gulpTasks[task]);
	tasks.push(task);
}

gulp.task("default", tasks);