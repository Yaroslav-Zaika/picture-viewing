'use strict'

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var sourcemaps = require('gulp-sourcemaps');
var del = require('del');
var runSequence = require('run-sequence');
var watch = require('gulp-watch');
var plumber = require('gulp-plumber');
var ngAnnotate = require('gulp-ng-annotate');
var inject = require('gulp-inject');
var autoprefixer = require('gulp-autoprefixer');
var sass = require('gulp-sass');
var express = require('express');
var path = require('path');
var opn = require('opn');

gulp.task('serve', function (next) {
  
  var app = express();
  
  app.use(express.static('dev'));
  app.use('*', express.static(path.join(__dirname, 'dev/index.html')));
  
  app.listen(3000);
  
  opn('http://localhost:3000');
});

gulp.task('lib', function () {
  return gulp.src([
    'node_modules/angular/angular.js',
    'node_modules/angular-route/angular-route.js',
    'node_modules/angular-animate/angular-animate.js',
    'node_modules/angular-aria/angular-aria.js'
  ])
    .pipe(plumber())
    .pipe(concat('libs.js'))
    .pipe(plumber())
    .pipe(gulp.dest('dev/lib'));
});

gulp.task('js', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(plumber())
    .pipe(concat('app.js'))
    .pipe(plumber())
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write('.'))
    .pipe(plumber())
    .pipe(gulp.dest('dev/js'));
});

gulp.task('sass', function() {
  return gulp.src(['./src/scss/*.scss', 'node_modules/angular-material/angular-material.scss'])
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('dev/css'));
});

gulp.task('assets', function () {
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('dev/assets'));
});

gulp.task('templates', function () {
  return gulp.src('./src/templates/**/*.html')
    .pipe(gulp.dest('dev/templates'));
});

gulp.task('index', function () {
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src(['./dev/css/*.css', './dev/css/angular-material.css'], {read: false}), {
      ignorePath: 'dev',
      addPrefix: '.',
      addRootSlash: false
    }))
    .pipe(inject(gulp.src(['./dev/lib/libs.js', './dev/js/app.js'], {read: false}), {
      ignorePath: 'dev',
      addPrefix: '.',
      addRootSlash: false
    }))
    .pipe(gulp.dest('dev'));
});

gulp.task('clean', function() {
  return del('dev');
});

gulp.task('default', function (callback) {
  runSequence('clean', ['lib', 'js', 'sass', 'assets', 'templates'], ['index'], ['watch'], ['serve'], callback);
});

gulp.task('watch', function () {
  watch('./src/js/**/*.js', function () {
    gulp.start('js');
  });
  
  watch('./src/scss/*.scss', function () {
    gulp.start('sass');
  });
  
  watch('./src/templates/**/*.html', function () {
    gulp.start('templates');
  });
  
  watch('./src/assets/**/*.*', function () {
    gulp.start('assets');
  });
  
  watch('./src/index.html', function () {
    gulp.start('index');
  });
});

gulp.task('prod', function (callback) {
  runSequence('prod-clean', ['prod-js'], ['prod-app', 'prod-sass', 'prod-templates', 'prod-assets'], ['prod-index'], ['prod-serve'], callback);
});

gulp.task('prod-serve', function () {
  
  var app = express();
  
  app.use(express.static('prod'));
  app.use('*', express.static(path.join(__dirname, 'prod/index.html')));
  
  app.listen(3000);
  
  opn('http://localhost:3000');
});

gulp.task('prod-js', function () {
  return gulp.src(['./src/js/**/*.js'])
    .pipe(plumber())
    .pipe(ngAnnotate())
    .pipe(plumber())
    .pipe(concat('js.min.js'))
    .pipe(plumber())
    .pipe(uglify())
    .pipe(plumber())
    .pipe(gulp.dest('prod/js'));
});

gulp.task('prod-app', function () {
  return gulp.src([
    'node_modules/angular/angular.min.js',
    'node_modules/angular-route/angular-route.min.js',
    'node_modules/angular-animate/angular-animate.min.js',
    'node_modules/angular-aria/angular-aria.min.js',
    'prod/js/js.min.js'
  ])
    .pipe(plumber())
    .pipe(concat('app.min.js'))
    .pipe(plumber())
    .pipe(gulp.dest('prod/js'));
});

gulp.task('prod-sass', function() {
  return gulp.src(['./src/scss/*.scss', 'node_modules/angular-material/angular-material.scss'])
    .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(gulp.dest('prod/css'));
});

gulp.task('prod-assets', function () {
  return gulp.src('./src/assets/**/*.*')
    .pipe(gulp.dest('prod/assets'));
});

gulp.task('prod-templates', function () {
  return gulp.src('./src/templates/**/*.html')
    .pipe(gulp.dest('prod/templates'));
});

gulp.task('prod-index', function (){
  return gulp.src('./src/index.html')
    .pipe(inject(gulp.src('./prod/css/*.css', {read: false}), {
      ignorePath: 'prod',
      addPrefix: '.',
      addRootSlash: false
    }))
    .pipe(inject(gulp.src('./prod/js/app.min.js', {read: false}), {
      ignorePath: 'prod',
      addPrefix: '.',
      addRootSlash: false
    }))
    .pipe(gulp.dest('prod'));
});

gulp.task('prod-clean', function() {
  return del('prod');
});