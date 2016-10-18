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
const cleanCSS = require('gulp-clean-css'); // minify css
const concat = require('gulp-concat'); // concat file
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
const build = 'build/';
const buildPug = 'build/pug/*.pug';
const buildPugTpl = 'build/pug/pug-tpl/*.pug';
const buildHtml = 'build/*.html';
const buildEs6 = 'build/es6/*.es6';
const buildJsSrc = 'build/js';
const buildJs = 'build/js/*.js';
const buildSass = 'build/sass/*.scss';
const buildCss = 'build/css/*.css';
const buildCssSrc = 'build/css';
const vendorCss = 'vendor/Framework7/dist/css/*.css';
const distJs = 'dist/js/*.js';
const distJsSrc = 'dist/js';
const distCssSrc = 'dist/css';
const dir = './';
const dirHtml = './*.html';

// task
// eslint
gulp.task('eslint', () => gulp.src(buildEs6)
    .pipe(changed(buildEs6))
    .pipe(stripDebug())
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError())
);
// es6 to js
gulp.task('es6', ['eslint'], () => gulp.src(buildEs6)
    .pipe(changed(buildEs6))
    .pipe(babel())
    .pipe(gulp.dest(buildJsSrc))
);
// js minify
gulp.task('jscompress', () => pump([gulp.src(buildJs), changed(buildJs), stripDebug(), uglify(), gulp.dest(distJsSrc)]));
// pug to html
gulp.task('pug-to-html', () => gulp.src(buildPug)
    .pipe(pug({ pretty: true, self: true }))
    .pipe(gulp.dest(build))
);
// htmlmin
gulp.task('htmlmin', () => gulp.src(buildHtml)
    .pipe(changed(buildHtml))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest(dir))
);
// scss to css
gulp.task('sass-to-css', () => gulp.src(buildSass)
    .pipe(changed(buildSass))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', e => console.log(e.message)))
    .pipe(autoPrefixer({
      browsers: ['last 99 versions'],
      cascade: false
    }))
    .pipe(sourcemaps.write('../../dist/css/maps'))
    .pipe(gulp.dest(buildCssSrc))
);
// purifycss
gulp.task('purifycss', () => gulp.src(vendorCss)
    .pipe(purifycss([dirHtml, distJs])
    .pipe(gulp.dest('dist/css/style.min.css')))
);
// replace
gulp.task('replace', () => gulp.src(dirHtml)
    .pipe(replace('css/style.css', 'dist/css/style.min.css'))
    .pipe(gulp.dest(dir))
);
// browser-sync
gulp.task('browser-sync', function browser() {
  browserSync.init({ server: { baseDir: './' } });
  gulp.watch([buildHtml, buildJs, buildCss]).on('change', browserSync.reload);
});
// css minify
gulp.task('minify-css', function minify() {
  return gulp.src(buildCss)
      .pipe(changed(buildCss))
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(concat('style.css'))
      .pipe(gulp.dest(distCssSrc));
});

// watch
// pug
gulp.task('pug-watch', () => gulp.watch([buildPug, buildPugTpl], ['pug-to-html']));
// es6
gulp.task('es6-watch', () => gulp.watch(buildEs6, ['es6']));
// sass
gulp.task('sass-watch', () => gulp.watch(buildSass, ['sass-to-css']));
// css
gulp.task('css-watch', () => gulp.watch(buildCss, ['minify-css']));

// develop
gulp.task('watch', ['pug-watch', 'es6-watch', 'sass-watch', 'css-watch', 'browser-sync']);

// release
gulp.task('release', ['htmlmin', 'jscompress', 'replace']);
