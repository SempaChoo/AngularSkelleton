var gulp = require('gulp'),
	browserSync = require('browser-sync').create(),
	sass        = require('gulp-sass'),
	uglify      = require('gulp-uglify');


	// process JS files and return the stream.
	gulp.task('js', function () {
	    return gulp.src('app/js/*js')
	        .pipe(uglify())
	        .pipe(gulp.dest('app/js/dist'))
	        .pipe(browserSync.stream());

	        browserSync.reload;
	});

	// Compile sass into CSS & auto-inject into browsers
	gulp.task('sass', function() {
	    return gulp.src("app/scss/**/*.scss")
	        .pipe(sass({outputStyle: 'compressed'}))
	        .pipe(gulp.dest("app/css"))
	        .pipe(browserSync.stream());

	        browserSync.reload;
	});

	// Static Server + watching scss/html files
	gulp.task('serve', function() {

	    browserSync.init({
	        server: "./app"
	    });

	    gulp.watch("app/scss/**/*.scss", ['sass']);
	    gulp.watch("app/js/*.js", ['js']);
	    gulp.watch("app/*.html").on('change', browserSync.reload);
	});


// Start Default Task
gulp.task('default', ['serve']);