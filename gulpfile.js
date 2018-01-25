/* Require */
var gulp = require('gulp'); // required to use gulp from npm packages
var sass = require('gulp-sass'); // Requires the gulp-sass plugin
var useref = require('gulp-useref'); // require for useref concatination
var uglify = require('gulp-uglify'); // require for uglifier
var gulpIf = require('gulp-if'); // require for uglifier
var cssnano = require('gulp-cssnano'); // require for css minify 
var imagemin = require('gulp-imagemin'); // optimizes images 
var cache = require('gulp-cache'); // for optimizing images created files
var del = require('del'); // Cleaning up generated files automatically
var runSequence = require('run-sequence'); // run task in sequence 
var browserSync = require('browser-sync').create(); // require for browser synch
/* End of Require */

// Gets all files ending with .scss in app/scss and children dirs
gulp.task('sass', function () {
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});

// Watches your file
gulp.task('watch', ['sass','browserSync', ], function () {
    gulp.watch('app/scss/**/*.scss', ['sass']);
    // Reloads the browser whenever HTML or JS files change
    gulp.watch('app/*.html', browserSync.reload);
    gulp.watch('app/js/**/*.js', browserSync.reload);
});

// Live reload
gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: './app'
        },
    })
})


// concatinates files then finifies and uglifies it
gulp.task('useref', function () {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        // Minifies only if it's a CSS file
        .pipe(gulpIf('*.css', cssnano()))
        .pipe(gulp.dest('dist'))
});

// for image optimization
gulp.task('images', function () {
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(imagemin({
            // Setting interlaced to true
            interlaced: true
        }))
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});
// deletes dist folder 
gulp.task('clean:dist', function () {
    return del.sync('dist');
})

// when doing a build
gulp.task('build', function (callback) {
    runSequence('clean:dist', ['sass', 'useref'],
        callback
    )
})

// default when typing gulp
gulp.task('default', function (callback) {
    runSequence(['sass', 'browserSync', 'watch'],
        callback
    )
})