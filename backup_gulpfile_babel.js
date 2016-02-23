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