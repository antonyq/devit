'use strict';
 
const gulp = require('gulp');
const rename = require('gulp-rename');
const nodemon = require('gulp-nodemon');
const sass = require('gulp-sass');

gulp.task('start', () => {
    nodemon({
    script: 'index.js'
    , ext: 'sass scss css js ejs html'
    , env: { 'NODE_ENV': 'development' }
    });
   
    gulp.watch('./src/sass/*.scss', ['sass']);

});

gulp.task('sass', () => {
    gulp.src('./src/sass/*.scss')
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('./src/css'));
});