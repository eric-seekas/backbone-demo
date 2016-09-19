/**
 * Created by dsky on 9/8/16.
 * gulp task to make development quickly
 * css sprite, imagemin, sass lint && sass to css, pug to html, css、js、html minify
 */

// plugin
const gulp = require('gulp');
const pug = require('gulp-pug'); // pug to html
const purifycss = require('gulp-purifycss'); // Clean unnecessary CSS
const changed = require('gulp-changed'); // changed file
const postcss = require('gulp-postcss'); // postcss
const sass = require('gulp-sass'); // scss to css
const autoPrefixer = require('gulp-autoprefixer'); // autoprefixer
const sourcemaps = require('gulp-sourcemaps'); // add sourcemaps
const htmlmin = require('gulp-htmlmin'); // purify html
const babel = require('gulp-babel'); // es6 to js
const eslint = require('gulp-eslint'); // eslint
const browserSync = require('browser-sync').create(); // browserSync
const replace = require('gulp-replace'); // gulp-replace
const stripDebug = require('gulp-strip-debug'); // Strip console, alert, and debugger
const pump = require('pump');
const uglify = require('gulp-uglify');// uglify js

// file path
const buildPug = 'build/pug/*.pug';
const buildPugTpl = 'build/pug/pug-tpl/*.pug';
const build = 'build/';
const buildHtml = 'build/*.html';
const buildJs = 'build/js/*.js';
const vendorCss = 'vendor/Framework7/dist/css/*.css';
const distJs = 'dist/js/*.js';
const distJsSrc = 'dist/js';
const dir = './';
const dirHtml = './*.html';

// task
// eslint
gulp.task('eslint', () => gulp.src(buildJs).pipe(changed(buildJs)).pipe(stripDebug()).pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError()));
// es6 to js
// js minify
gulp.task('jscompress', () => pump([gulp.src(buildJs), stripDebug(), uglify(), gulp.dest(distJsSrc)]));
// pug to html
gulp.task('pug-to-html', () => gulp.src(buildPug).pipe(pug({ pretty: true, self: true })).pipe(gulp.dest(build)));
// htmlmin
gulp.task('htmlmin', () => gulp.src(buildHtml).pipe(changed(buildHtml)).pipe(htmlmin({ collapseWhitespace: true })).pipe(gulp.dest(dir)));
// replace
gulp.task('replace', () => gulp.src(dirHtml).pipe(replace('css/style.css', 'dist/css/style.css')).pipe(gulp.dest(dir)));
// purifycss
gulp.task('purifycss', () => gulp.src(vendorCss).pipe(purifycss([dirHtml, distJs]).pipe(gulp.dest('dist/css/style.min.css'))));

// watch
gulp.task('pug-watch', () => gulp.watch((buildPug, buildPugTpl), ['pug-to-html']));

// develop
gulp.task('watch', ['pug-watch']);
// release
gulp.task('release', ['htmlmin', 'replace']);
