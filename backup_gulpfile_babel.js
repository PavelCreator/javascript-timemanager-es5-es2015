/*import browserify from 'browserify';
import source from 'vinyl-source-stream';
import gutil from 'gulp-util';
import buffer from 'vinyl-buffer';
gulp.task("build-js-es6", () => {
  return browserify(config.src.es6)
    .transform("babelify", {presets: ["es2015"], sourceMaps: true})
    .bundle()
    .pipe(source("main.min.js"))
    .pipe(buffer())
    .pipe(sourcemaps.init({loadMaps: true}))
    .pipe(uglify())
    .pipe(sourcemaps.write('./'))
    .pipe(gulp.dest(config.build.es6))
    .pipe(notify({message: 'Build ES6 task complete'}))
    .pipe(gutil.noop());
});*/

{
  "name": "PavelCreator",
  "version": "0.0.1",
  "license": "BSD-3-Clause",
  "repository": {},
  "devDependencies": {
    "babel-core": "^6.5.2",
    "babel-plugin-uglify": "^1.0.2",
    "babel-preset-es2015": "^6.5.0",
    "babelify": "^7.2.0",
    "bootstrap": "^3.3.6",
    "browserify": "^13.0.0",
    "del": "^2.2.0",
    "gulp": "^3.9.1",
    "gulp-autoprefixer": "^3.1.0",
    "gulp-babel": "^6.1.2",
    "gulp-cache": "^0.4.2",
    "gulp-concat": "^2.6.0",
    "gulp-cssnano": "^2.1.1",
    "gulp-htmlmin": "^1.3.0",
    "gulp-imagemin": "^2.4.0",
    "gulp-jshint": "^2.0.0",
    "gulp-livereload": "^3.8.1",
    "gulp-notify": "^2.2.0",
    "gulp-remove-html-comments": "^1.0.1",
    "gulp-rename": "^1.2.2",
    "gulp-sass": "^2.2.0",
    "gulp-sourcemaps": "^1.6.0",
    "gulp-uglify": "^1.5.2",
    "gulp-util": "^3.0.7",
    "jshint": "^2.9.1",
    "vinyl-buffer": "^1.0.0",
    "vinyl-source-stream": "^1.1.0"
  },
  "dependencies": {
    "babel-core": "^6.1.21"
  }
}
