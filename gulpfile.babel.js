'use strict';

import gulp from "gulp";
import rename from 'gulp-rename';
import autoprefixer from 'gulp-autoprefixer';
import notify from 'gulp-notify';
import del from 'del';
import sass from 'gulp-sass';
import cssnano from 'gulp-cssnano';
import imagemin from 'gulp-imagemin';
import cache from 'gulp-cache';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import htmlmin from 'gulp-htmlmin';
import removeHtmlComments from 'gulp-remove-html-comments';
import sourcemaps from 'gulp-sourcemaps';
import babel from 'gulp-babel';

const config = {
  src: {
    css: 'src/scss/*.scss',
    img: 'src/img/*',
    es5: [
      'src/es5/hoisting.js',
      'src/es5/services/*.js',
      'src/es5/controllers/*.js',
      'src/es5/start.js'
    ],
    es6: [
      'src/es6/hoisting.js',
      'src/es6/services/app_service.js',
      'src/es6/services/auxiliary_service.js',
      'src/es6/services/data_service.js',
      'src/es6/controllers/app_controller.js',
      'src/es6/controllers/event_controller.js',
      'src/es6/controllers/view_controller.js',
      'src/es6/start.js'
    ],
    htmlES5: 'index-src-es5.html',
    htmlES6: 'index-src-es6.html'
  },
  build: {
    css: 'build/css',
    img: 'build/img',
    es5: 'build/es5',
    es6: 'build/es6',
    html: './'
  }
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
  return gulp.src(config.src.es5)
    .pipe(concat('main.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(config.build.es5))
    .pipe(notify({message: 'Build ES5 task complete'}));
});

gulp.task('build-js-es6', () =>
    gulp.src(config.src.es6)
      .pipe(sourcemaps.init())
      .pipe(babel({
        presets: ['es2015']
      }))
      .pipe(concat('main.min.js'))
      .pipe(uglify())
      .pipe(sourcemaps.write('.'))
      .pipe(gulp.dest(config.build.es6))
      .pipe(notify({message: 'Build ES6 task complete'}))
);

gulp.task('build-html-es5', () => {
  return gulp.src(config.src.htmlES5)
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

gulp.task('build-es6', () => {
  return gulp.src(config.src.html)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML task complete'}));
});

gulp.task('clean', () => {
  return del(['build/css', 'build/es5', 'build/es6', 'build/img', 'index.html']);
});

gulp.task('watch-css', () => {
  gulp.watch(config.src.css, ['build-css'])
})
gulp.task('watch-js-es5', () => {
  gulp.watch(config.src.es5, ['build-js-es5'])
})
gulp.task('watch-js-es6', () => {
  gulp.watch(config.src.es6, ['build-js-es6'])
})
gulp.task('watch-img', () => {
  gulp.watch(config.src.img, ['build-img'])
})
gulp.task('watch-html-es5', () => {
  gulp.watch(config.src.html, ['build-html-es5'])
})
gulp.task('watch-html-es6', () => {
  gulp.watch(config.src.html, ['build-html-es6'])
})

gulp.task('watch-es5', ['watch-css', 'watch-js-es5', 'watch-img', 'watch-html-es5'])
gulp.task('build-es5', ['build-css', 'build-js-es5', 'build-img', 'build-html-es5'])
gulp.task('watch-es6', ['watch-css', 'watch-js-es6', 'watch-img', 'watch-html-es6'])
gulp.task('build-es6', ['build-css', 'build-js-es6', 'build-img', 'build-html-es6'])
gulp.task('default', ['build-js-es6'])
/*npm install --save-dev packName*/