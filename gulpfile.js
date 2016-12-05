var gulp = require('gulp');
var ts = require('gulp-typescript');
var sourcemaps = require('gulp-sourcemaps');

var tsProject = ts.createProject('tsconfig.json');

gulp.task('typescript', function() {
    var tsResult = tsProject.src() 
        .pipe(sourcemaps.init())
        .pipe(tsProject());
 
    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('generated'));
});

gulp.task('watch', ['typescript'], function() {
    gulp.watch('src/**/*.ts', ['typescript']);
});