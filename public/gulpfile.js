var gulp = require('gulp')
var sass = require('gulp-sass')
var pug = require('gulp-pug')
var concat = require('gulp-concat')
const imagemin = require('gulp-imagemin')
const cleanCSS = require('gulp-clean-css')
var uglify = require('gulp-uglify')

sass.compiler = require('node-sass')

gulp.task('sass', () => {
  return gulp.src('views/styles/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('views/styles/css'))
});

gulp.task('minify-css', () => {
  return gulp.src('views/styles/css/*.css')
    .pipe(cleanCSS({
      compatibility: 'ie8'
    }))
    .pipe(gulp.dest('public/css'))
});

gulp.task('pug', () => {
  return gulp.src('views/*.pug')
    .pipe(pug({}))
    .pipe(gulp.dest('public/html'))
});

gulp.task('concat', () => {
  return gulp.src('views/js/*.js')
    .pipe(concat('main.js'))
    .pipe(gulp.dest('public/js'))
});

gulp.task('imagemin', () => {
  gulp.src('views/img/*')
    .pipe(imagemin())
    .pipe(gulp.dest('public/img'))
});

gulp.task('uglify', () => {
  return gulp.src('public/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('public/js'))
});

//
gulp.task('run', gulp.series(['sass', 'minify-css', 'pug', /*'concat', 'uglify'*/]))

gulp.task('watch', () => {
  gulp.watch('views/styles/sass/*.scss', gulp.series('sass'))
  gulp.watch('views/styles/css/*.css', gulp.series('minify-css'))
  gulp.watch('views/*.pug', gulp.series('pug'))
  //gulp.watch('views/js/*.js', gulp.series('concat'))
  //gulp.watch('public/js/*.js', gulp.series('uglify'))
});

gulp.task('default', gulp.series(['run', 'watch']))
