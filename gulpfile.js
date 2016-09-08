/**
 * Created by dsky on 9/8/16.
 * gulp task to make development quickly
 * css sprite, imagemin, sass lint && sass to css, css minify, js minify
 */
'use strict';
// plugin
var gulp = require('gulp');
var pug = require('gulp-pug'); // pug to html
var purifycss = require('gulp-purifycss'); // Clean unnecessary CSS
var changed = require('gulp-changed'); // changed file
var postcss = require('gulp-postcss'); // postcss
var sass = require('gulp-sass');//scss to css
var autoPrefixer = require('gulp-autoprefixer');//autoprefixer
var sourcemaps = require('gulp-sourcemaps');//add sourcemaps
var htmlmin = require('gulp-htmlmin');//purify html
var babel = require('gulp-babel');//es6 to js
// eslint
// file path
// develop
// official