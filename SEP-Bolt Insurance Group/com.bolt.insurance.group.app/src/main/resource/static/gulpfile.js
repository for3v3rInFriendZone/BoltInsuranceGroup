var gulp = require('gulp');
var jshint = require('gulp-jshint');

gulp.task('hint',function(){
	gulp.src('app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));

});

gulp.task('watch',function(){
	gulp.watch('app/**/*.js',['hint']);

});

gulp.task('default',['hint','watch']);