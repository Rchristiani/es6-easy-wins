var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('js', function() {
	gulp.src('*.esnext.js')
		.pipe(babel())
		.pipe(concat('script.js'))
		.pipe(gulp.dest('.'));
});

gulp.task('default', function() {
	gulp.watch('*.esnext.js',['js']);
});