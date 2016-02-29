'use strict';
const gulp = require('gulp');
const rename = require('gulp-rename');
const autoprefixer = require('gulp-autoprefixer');
const notify = require('gulp-notify');
const del = require('del');

const sass = require('gulp-sass');
const cssnano = require('gulp-cssnano');

const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');

const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const stripDebug = require('gulp-strip-debug');
const sourcemaps = require('gulp-sourcemaps');
const babel = require('gulp-babel');

const htmlmin = require('gulp-htmlmin');
const removeHtmlComments = require('gulp-remove-html-comments');

const config = {
  src: {
    css: 'src/scss/*.scss',
    img: 'src/img/*',
    jsES5: [
      'src/es5/hoisting.js',
      'src/es5/services/*.js',
      'src/es5/controllers/*.js',
      'src/es5/start.js'
    ],
    jsES6: [
      'src/es6/hoisting.js',
      'src/es6/services/*.js',
      'src/es6/controllers/*.js',
      'src/es6/start.js'
    ],
    htmlES5: 'index-src-es5.html',
    htmlES5T: 'index-src-es5-tests.html',
    htmlES6: 'index-src-es6.html',
    jsES5T: 'tests/es5/*.js',
  },
  build: {
    css: 'build/css',
    img: 'build/img',
    jsES5: 'build/es5',
    jsES6: 'build/es6',
    html: './'
  }
}

function swallowError (error) {
  console.log(error.toString());
  this.emit('end');
}

gulp.task('build-css', () => {
  gulp.src(config.src.css)
    .pipe(sass({
      outputStyle: 'expanded'
    }).on('error', sass.logError))
    .pipe(autoprefixer())
    .pipe(cssnano())
    .pipe(rename({extname: '.min.css'}))
    .pipe(gulp.dest(config.build.css))
    .pipe(notify({message: 'Build CSS task complete'}));
})

gulp.task('build-img', () => {
  gulp.src(config.src.img)
    .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
    .pipe(gulp.dest(config.build.img))
    .pipe(notify({message: 'Build Images task complete'}));
});

gulp.task('build-js-es5', () => {
  return gulp.src(config.src.jsES5)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(stripDebug())
    .pipe(gulp.dest(config.build.jsES5))
    .pipe(notify({message: 'Build ES5 task complete'}));
});

gulp.task('build-js-es5-tests', () => {
  return gulp.src(config.src.jsES5T)
    .pipe(concat('tests.min.js'))
    .pipe(gulp.dest(config.build.jsES5))
    .pipe(notify({message: 'Build Tests ES5 task complete'}));
});

gulp.task('build-js-es6', () =>
    gulp.src(config.src.jsES6)
      //.pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }).on('error', swallowError))
      .pipe(concat('main.min.js'))
      //.pipe(uglify())
      //.pipe(stripDebug())
      //.pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.build.jsES6))
      //.pipe(notify({message: 'Build ES6 task complete'}))
);

gulp.task('build-html-es5', () => {
  return gulp.src(config.src.htmlES5)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML-ES5 task complete'}));
});

gulp.task('build-html-es5-tests', () => {
  return gulp.src(config.src.htmlES5T)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML-ES5 task complete'}));
});

gulp.task('build-html-es6', () => {
  return gulp.src(config.src.htmlES6)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML-ES6 task complete'}));
});

gulp.task('clean', () => {
  return del(['build/css', 'build/es5', 'build/es6', 'build/img', 'index.html']);
});

gulp.task('watch-css', () => {
  gulp.watch(config.src.css, ['build-css'])
})
gulp.task('watch-js-es5', () => {
  gulp.watch(config.src.jsES5, ['build-js-es5'])
})
gulp.task('watch-js-es5-tests', () => {
  gulp.watch(config.src.jsES5T, ['build-js-es5-tests'])
})
gulp.task('watch-js-es6', () => {
  gulp.watch(config.src.jsES6, ['build-js-es6'])
})
gulp.task('watch-img', () => {
  gulp.watch(config.src.img, ['build-img'])
})
gulp.task('watch-html-es5', () => {
  gulp.watch(config.src.htmlES5, ['build-html-es5'])
})
gulp.task('watch-html-es5-tests', () => {
  gulp.watch(config.src.htmlES5T, ['build-html-es5-tests'])
})
gulp.task('watch-html-es6', () => {
  gulp.watch(config.src.htmlES6, ['build-html-es6'])
})

gulp.task('w5', ['watch-css', 'watch-js-es5', 'watch-img', 'watch-html-es5'])
gulp.task('b5', ['build-css', 'build-js-es5', 'build-img', 'build-html-es5'])

gulp.task('w5t', ['watch-css', 'watch-js-es5', 'watch-img', 'watch-html-es5-tests', 'watch-js-es5-tests'])
gulp.task('b5t', ['build-css', 'build-js-es5', 'build-img', 'build-html-es5-tests', 'build-js-es5-tests'])

gulp.task('w6', ['watch-css', 'watch-js-es6', 'watch-img', 'watch-html-es6'])
gulp.task('b6', ['build-css', 'build-js-es6', 'build-img', 'build-html-es6'])
gulp.task('default', ['w5t'])
/*npm install --save-dev packName*/