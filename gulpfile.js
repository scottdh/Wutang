const gulp = require('gulp')
const sass = require('gulp-sass')
const browserSync = require('browser-sync').create()
const sourcemaps = require('gulp-sourcemaps')
const gulpif = require('gulp-if')
const del = require('del')
const webpack = require('webpack-stream')

// Helper to get command line args
const args = (argList => {
  let arg = {},
    a,
    opt,
    thisOpt,
    curOpt
  for (a = 0; a < argList.length; a++) {
    thisOpt = argList[a].trim()
    opt = thisOpt.replace(/^\-+/, '')

    if (opt === thisOpt) {
      if (curOpt) arg[curOpt] = opt
      curOpt = null
    } else {
      curOpt = opt
      arg[curOpt] = true
    }
  }

  return arg
})(process.argv)

// Component tasks
gulp.task('clean', () => del('./dist', { force: true }))
gulp.task('copy:fonts', () => gulp.src('./src/fonts').pipe(gulp.dest('./dist')))
gulp.task('copy:images', () => gulp.src('./src/img').pipe(gulp.dest('./dist')))
gulp.task('copy:html', () =>
  gulp.src('./src/index.html').pipe(gulp.dest('./dist'))
)
gulp.task('styles', () => {
  return gulp
    .src('./src/scss/*.scss')
    .pipe(gulpif(!args.b, sourcemaps.init()))
    .pipe(sass().on('error', sass.logError))
    .pipe(gulpif(!args.b, sourcemaps.write('.')))
    .pipe(gulp.dest('./dist/css'))
    .pipe(browserSync.stream())
})
gulp.task('scripts', () => {
  const settings = {
    mode: 'development',
    devtool: args.b ? '' : 'source-map',
    output: {
      filename: 'bundle.js'
    }
  }

  return gulp
    .src('./src/js/app.js')
    .pipe(webpack(settings, null, browserSync.reload))
    .pipe(gulp.dest('./dist/js'))
})
gulp.task('watch', cb => {
  if (args.b) return cb()

  browserSync.init({
    server: {
      baseDir: './dist'
    }
  })

  // Watch tasks
  // NB. copy:html and copy:images require a manual
  // browser reload after undates
  gulp.watch('./src/**/*.html', gulp.series('copy:html'))
  gulp.watch('./src/img/**/*.{jpg,svg,png,gif}', gulp.series('copy:images'))
  gulp.watch('./src/scss/*.scss', gulp.series('styles'))
  gulp.watch('./src/js/*.{js,json}', gulp.series('scripts'))

  return cb()
})

// Top level tasks
gulp.task(
  'build',
  gulp.series(
    gulp.series('clean'),
    gulp.parallel('copy:fonts', 'copy:images', 'copy:html'),
    gulp.parallel('styles', 'scripts')
  )
)
gulp.task('dev', gulp.series('build', 'watch'))
gulp.task('default', gulp.series('dev'))
