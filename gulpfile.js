const gulp = require("gulp");
const sass = require("gulp-sass");
const browserSync = require("browser-sync").create();
const sourcemaps = require("gulp-sourcemaps");
const plumber = require("gulp-plumber");
const browserify = require("browserify");
const source = require("vinyl-source-stream");
const buffer = require("vinyl-buffer");
const watchify = require("watchify");
const babelify = require("babelify");

function style() {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest("./dist/css"))
    .pipe(browserSync.stream());
}

function compile(watch) {
  var bundler = watchify(
    browserify("./src/js/app.js", { debug: true }).transform(
      babelify.configure({
        presets: ["@babel/preset-env"]
      })
    )
  );

  function rebundle() {
    bundler
      .bundle()
      .pipe(plumber())
      .pipe(source("bundle.js"))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
      .pipe(sourcemaps.write("./"))
      .pipe(gulp.dest("./dist/js"));
  }

  if (watch) {
    bundler.on("update", function() {
      console.log("-> bundling...");
      rebundle();
    });
  }

  rebundle();
}

function dev() {
  compile(true);
  gulp.watch("./dist/**/*.html").on("change", browserSync.reload);
  gulp.watch("./src/**/*.scss", style);
  gulp.watch("./src/**/*.{js,json}").on("change", browserSync.reload);
  browserSync.init({
    server: {
      baseDir: "./dist"
    }
  });
}

exports.style = style;
exports.dev = dev;
exports.default = dev;
