var gulp = require('gulp');

var babel = require("gulp-babel");
var jshint = require('gulp-jshint');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var templateCache = require('gulp-angular-templatecache');
var addStream = require('add-stream');
var ngAnnotate = require('gulp-ng-annotate');

gulp.task('lint', function() {
    return gulp.src(['src/**/*.js', '!src/lib/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

function prepareTemplates() {
    return gulp.src('src/components/**/*.html')
        //.pipe(minify and preprocess the template html here)
        .pipe(templateCache());
}

gulp.task('scripts', function() {

    return gulp.src(
        [
            // 'src/lib/angular.min.js',
           //  './src/lib/angular.min.js',
          //   'src/lib/*.js',
            'src/main.js',
            'src/components/**/*.js'
        ]
    )
        .pipe(addStream.obj(prepareTemplates()))
        .pipe(concat('main.js'))
        .pipe(ngAnnotate())
        .pipe(babel({
            compact: false,
            presets: ['es2015']
        }))
        .pipe(gulp.dest('public/js/'))
        .pipe(rename('main.js'))
         .pipe(uglify( ))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('watch', function() {
    gulp.watch([  'src/*.js','src/components/**','public/index.html'], ['lint', 'scripts']);
});


gulp.task('connect', function () {
    connect.server({
        root: 'public',
        port: 80
    })
});

gulp.task('default', ['lint', 'scripts', 'connect','watch']);
