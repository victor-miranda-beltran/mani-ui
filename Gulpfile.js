var gulp = require('gulp');
var sass = require('gulp-ruby-sass');
var concat = require('gulp-concat');
var mainBowerFiles = require('main-bower-files');
var rename = require('gulp-rename');
var ngHtml2Js = require("gulp-ng-html2js");
var serve = require('gulp-serve');
var del = require('del');

var print = require('gulp-print');


var publishdir = 'dist';

var dist = {
	css: publishdir + '/css/',
	js: publishdir + '/js/',
	vendor: publishdir + '/static/'
};

var paths = {
	scripts : 'src/js/**/*',
	images : 'src/img/**/*',
	views : 'src/views/**/*',
	index: 'src/index.html',
	scss: 'src/scss/**/*'
};

gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		//.pipe(concat('main.js'))
		.pipe(gulp.dest('dist/js'));
});

gulp.task('images', function() {
	return gulp.src('src/imgs/**/*')
			//.pipe(concat('main.js'))
			.pipe(gulp.dest('dist/imgs'));
});

gulp.task('sass', function() {
	return sass('src/scss/style.scss', {style: 'compressed'})
		.pipe(rename({suffix: '.min'}))
		.pipe(gulp.dest('dist/css'));
});

gulp.task('partials', function () {
	return gulp.src('src/views/**/*.html')
		.pipe(ngHtml2Js({
			moduleName: "templates",
			prefix: "views/"
		}))
		.pipe(gulp.dest("dist/views"));
});

// Rerun the task when a file changes
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.views, ['partials']);
	gulp.watch(paths.scss, ['sass'])
	gulp.watch(paths.index, ['index']);
});

gulp.task('bower', function() {
	return gulp.src(mainBowerFiles(/* options */), { base: 'bower_components' })
		.pipe(gulp.dest(dist.js));
});

gulp.task('index', function () {
	return gulp.src('src/index.html')
		.pipe(print())
		.pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
	return del(['dist/*']);
});

gulp.task('serve', serve('dist'));

// Default Task
gulp.task('default', ['bower','index','scripts','images','partials','index','sass','watch']);
