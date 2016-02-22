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

  browserify = require('browserify'),
  source = ('vinyl-source-stream'),

  config = {
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
        'src/es6/hoisting.js.es6'/*,
         'src/es6/services/!*.js',
         'src/es6/controllers/!*.js',
         'src/es6/start.js'*/
      ],
      html: 'index-src.html'
    },
    build: {
      css: 'build/css',
      img: 'build/img',
      es5: 'build/es5',
      es6: 'build/es6',
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
    .pipe(cache(imagemin({optimizationLevel: 5, progressive: true, interlaced: true})))
    .pipe(gulp.dest(config.build.img))
    .pipe(notify({message: 'Build Images task complete'}));
});

gulp.task('build-es5', function () {
  return gulp.src(config.src.es5)
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.build.es5))
    .pipe(notify({message: 'Build ES5 task complete'}));
});

gulp.task("build-es6", function () {
  return browserify(config.src.es6)
    .transform("babelify")
    .bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest(config.build.es6))
    .pipe(notify({message: 'Build ES6 task complete'}));
});

/*gulp.task("build-es7", function () {
  return gulp.src(config.src.es6)
    .pipe(transform("babelify"))
    .pipe(concat('main.js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(uglify())
    .pipe(gulp.dest(config.build.es6))
    .pipe(notify({message: 'Build ES6 task complete'}));
});*/

gulp.task('build-html', function () {
  return gulp.src(config.src.html)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML task complete'}));
});

gulp.task('build-es6', function () {
  return gulp.src(config.src.html)
    .pipe(removeHtmlComments())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(rename('index.html'))
    .pipe(gulp.dest(config.build.html))
    .pipe(notify({message: 'Build HTML task complete'}));
});

gulp.task('clean', function () {
  return del(['build/css', 'build/es5', 'build/ed6', 'build/img', 'index.html']);
});

gulp.task('watch-css', function () {
  gulp.watch(config.src.css, ['build-css'])
})
gulp.task('watch-es5', function () {
  gulp.watch(config.src.es5, ['build-es5'])
})
gulp.task('watch-es6', function () {
  gulp.watch(config.src.es6, ['build-es6'])
})
gulp.task('watch-img', function () {
  gulp.watch(config.src.img, ['build-img'])
})
gulp.task('watch-html', function () {
  gulp.watch(config.src.html, ['build-html'])
})

gulp.task('watch', ['watch-css', 'watch-es5', 'watch-img', 'watch-html'])
gulp.task('build', ['build-css', 'build-es5', 'build-img', 'build-html'])
gulp.task('default', ['build-es6'])
/*npm install --save-dev packName*/