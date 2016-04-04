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
      'src/es5/storage/*.js',
      'src/es5/services/*.js',
      'src/es5/controllers/*.js',
      'src/es5/start.js'
    ],
    jsES2015: [
      'src/es2015/hoisting.js',
      'src/es2015/storage/*.js',
      'src/es2015/services/*.js',
      'src/es2015/controllers/*.js',
      'src/es2015/start.js'
    ],
    htmlES5: 'index-src-es5.html',
    htmlES5T: 'index-src-tests.html',
    htmlES2015: 'index-src-es2015.html',
    jsES5T: 'tests/chai_mocha/tests/*.js',
  },
  build: {
    css: 'build/css',
    img: 'build/img',
    jsES5: 'build/es5',
    jsES2015: 'build/es2015',
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
    .pipe(notify({message: 'Build ES5 task complete'}))
    .on('error', swallowError);
});

gulp.task('build-js-tests', () => {
  return gulp.src(config.src.jsES5T)
    .pipe(concat('tests.min.js'))
    .pipe(gulp.dest(config.build.jsES5))
    .pipe(notify({message: 'Build Tests ES5 task complete'}));
});

gulp.task('build-js-es2015', () =>
    gulp.src(config.src.jsES2015)
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }).on('error', swallowError))
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(stripDebug())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.build.jsES2015))
      .pipe(notify({message: 'Build ES2015 task complete'}))
);

gulp.task('build-html-es5', () => {
  return gulp.src(config.src.htmlES5)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML-ES5 task complete'}));
});

gulp.task('build-html-tests', () => {
  return gulp.src(config.src.htmlES5T)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML-ES5 task complete'}));
});

gulp.task('build-html-es2015', () => {
  return gulp.src(config.src.htmlES2015)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML-ES2015 task complete'}));
});

gulp.task('clean', () => {
  return del(['build/css', 'build/es5', 'build/es2015', 'build/img', 'index.html']);
});

gulp.task('watch-css', () => {
  gulp.watch(config.src.css, ['build-css'])
})
gulp.task('watch-js-es5', () => {
  gulp.watch(config.src.jsES5, ['build-js-es5'])
})
gulp.task('watch-js-tests', () => {
  gulp.watch(config.src.jsES5T, ['build-js-tests'])
})
gulp.task('watch-js-es2015', () => {
  gulp.watch(config.src.jsES2015, ['build-js-es2015'])
})
gulp.task('watch-img', () => {
  gulp.watch(config.src.img, ['build-img'])
})
gulp.task('watch-html-es5', () => {
  gulp.watch(config.src.htmlES5, ['build-html-es5'])
})
gulp.task('watch-html-tests', () => {
  gulp.watch(config.src.htmlES5T, ['build-html-tests'])
})
gulp.task('watch-html-es2015', () => {
  gulp.watch(config.src.htmlES2015, ['build-html-es2015'])
})

gulp.task('w5', ['watch-css', 'watch-js-es5', 'watch-img', 'watch-html-es5'])
gulp.task('b5', ['build-css', 'build-js-es5', 'build-img', 'build-html-es5'])

gulp.task('wt', ['watch-css', 'watch-js-es5', 'watch-img', 'watch-html-tests', 'watch-js-tests'])
gulp.task('bt', ['build-css', 'build-js-es5', 'build-img', 'build-html-tests', 'build-js-tests'])

gulp.task('w2015', ['watch-css', 'watch-js-es2015', 'watch-img', 'watch-html-es2015'])
gulp.task('b2015', ['build-css', 'build-js-es2015', 'build-img', 'build-html-es2015'])
gulp.task('default', ['w2015'])