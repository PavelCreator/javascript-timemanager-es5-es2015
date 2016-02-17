var
  gulp = require('gulp'),

  rename = require('gulp-rename'),
  autoprefixer = require('gulp-autoprefixer'),
  notify = require('gulp-notify'),
  del = require('del'),

  sass = require('gulp-sass'),
  cssnano = require('gulp-cssnano'),

  imagemin = require('gulp-imagemin'),
  cache = require('gulp-cache'),

  jshint = require('gulp-jshint'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),

  htmlmin = require('gulp-htmlmin'),
  removeHtmlComments = require('gulp-remove-html-comments'),

  config = {
    src: {
      css: 'src/scss/*.scss',
      img: 'src/img/*',
      js: [
        'src/js/hoisting.js',
        'src/js/services/*.js',
        'src/js/controllers/*.js',
        'src/js/start.js'
      ],
      html: 'index-src.html'
    },
    build: {
      css: 'build/css',
      img: 'build/img',
      js: 'build/js',
      html: './'
    }
  }

gulp.task('build-css', function () {
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

gulp.task('build-img', function () {
  gulp.src(config.src.img)
    .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
    .pipe(gulp.dest(config.build.img))
    .pipe(notify({message: 'Build Images task complete'}));
});

gulp.task('build-js', function () {
  return gulp.src(config.src.js)
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.build.js))
    .pipe(notify({message: 'Build JS task complete'}));
});

gulp.task('build-html', function () {
  return gulp.src(config.src.html)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML task complete'}));
});

gulp.task('clean', function() {
    return del(['build/css', 'build/js', 'build/img', 'index.html']);
});

gulp.task('watch-css', function () {
  gulp.watch(config.src.css, ['build-css'])
})
gulp.task('watch-js', function () {
  gulp.watch(config.src.js, ['build-js'])
})
gulp.task('watch-img', function () {
  gulp.watch(config.src.img, ['build-img'])
})
gulp.task('watch-html', function () {
  gulp.watch(config.src.html, ['build-html'])
})

gulp.task('watch', ['watch-css', 'watch-js', 'watch-img', 'watch-html'])
gulp.task('build', ['build-css', 'build-js', 'build-img', 'build-html'])
gulp.task('default', ['build-html'])
/*npm install --save-dev packName*/