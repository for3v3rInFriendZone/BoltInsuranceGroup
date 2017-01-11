var gulp = require('gulp');
var jshint = require('gulp-jshint');
var gNgFileSort = require('gulp-angular-filesort');
var print = require('gulp-print');
var concat = require('gulp-concat');
var concatVendor = require('gulp-concat-vendor');
var uglify = require('gulp-uglify');
var insertLines = require('gulp-insert-lines');
var deleteLines = require('gulp-delete-lines');
var removeEmptyLines = require('gulp-remove-empty-lines');

var themeScriptOrder = ['modernizr-2.6.2.min.js','jquery-1.11.0.min.js',
'bootstrap.min.js','waypoints.min.js','owl.carousel.min.js','jquery.scrollTo.min.js',
'front.js'];

var vendorFiles=['angular/angular.js',
'angular-ui-router/release/angular-ui-router.js',
'angular-scroll/angular-scroll.js',
'angular-scroll-animate/dist/angular-scroll-animate.js',
'angular-bootstrap/ui-bootstrap.js',
'angular-bootstrap/ui-bootstrap-tpls.js',
'angular-animate/angular-animate.js',
'lodash/lodash.js',
'restangular/src/restangular.js',
'angularjs-datepicker/src/js/angular-datepicker.js',
'angular-fancy-modal/dist/angular-fancy-modal.js',
'angular-local-storage/dist/angular-local-storage.js',
'angular-translate/angular-translate.js',
'angular-sanitize/angular-sanitize.js'];

var addPathPrefix = function(orderedPaths){
	scriptPaths = [];
	for (var i = 0; i < orderedPaths.length; i++) {
		scriptPaths.push('assets/js/'+orderedPaths[i]); 
	}
	return scriptPaths;


}

gulp.task('hint',function(){
	gulp.src('app/**/*.js')
		.pipe(jshint())
		.pipe(jshint.reporter('default'));

});

gulp.task('watch',function(){
	gulp.watch('app/**/*.js',['hint']);

});

gulp.task('default',['hint','watch']);


//Application js minification
gulp.task('scripts',function(){

	gulp.src('app/**/*.js')
		.pipe(gNgFileSort())
		.pipe(print())
		.pipe(concat('all.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('../public/assets/js'));


});

//Template script minification
gulp.task('theme-scripts',function(){

	gulp.src(addPathPrefix(themeScriptOrder))
		.pipe(print())
		.pipe(concat('theme.min.js'))
		.pipe(gulp.dest('../public/assets/js'));

});

//Vendor script minification
gulp.task('vendor-scripts',function(){

    gulp.src(addPathPrefix(vendorFiles))
		.pipe(print())
		.pipe(concatVendor('vendor.min.js'))
		.pipe(uglify())
	    .pipe(gulp.dest('../public/assets/js'));

});

gulp.task('production', ['vendor-scripts','theme-scripts', 'scripts'], function() {
	
	gulp.src(['!app/**/*.js', 'app/**/*']).pipe(gulp.dest('../public/app'));
	gulp.src(['!assets/js/**/*', 'assets/**/*']).pipe(gulp.dest('../public/assets'));
	
	//Najzad modifikujemo index.html tako da izbacimo sve script tagove i ubacimo samo dva, jedan za vendor.min.js i drugi za all.min.js
	gulp.src("index.html")
		.pipe(deleteLines({
      		'filters': [
      			/<script/i
  			]
    	}))
  		.pipe(insertLines({
      		'before': /<\/body>$/,
	      	'lineBefore': '\t\t<script type="text/javascript" src="assets/js/vendor.min.js"></script>\n' + 
	      				  '\t\t<script type="text/javascript" src="assets/js/theme.min.js"></script>\n'+ 
	      				  '\t\t<script type="text/javascript" src="assets/js/all.min.js"></script>'
	    }))
	    .pipe(removeEmptyLines({
		    removeComments: true
		}))
	    .pipe(gulp.dest('../public'));


});
