require('dotenv').config()
const annotate = require('gulp-ng-annotate')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const del = require('del')
const gulp = require('gulp')
const gulpIf = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const series = require('stream-series')
const replace = require('gulp-replace')
const sequence = require('run-sequence')
const templates = require('gulp-angular-templatecache')
const uglify = require('gulp-uglify')
const buffer = require('buffer-to-vinyl')
const ngConfig = require('gulp-ng-config')

const prod = process.env.NODE_ENV === 'production'
const dest = process.env.APP_DIST || 'dist'
const base = process.env.API_BASE || ''

const Config = {
  APP: {
    apiURL: `${base}/api/v1`,
    uiURL: `${base}/ui`,
    loginURL: '/login',
    sessionKey: 'odin:session'
  }
}

gulp.task('app.css', () => {
  return gulp
    .src(['src/**/*.css'])
    .pipe(concat('app.css'))
    .pipe(gulpIf(prod, cssnano({ safe: true })))
    .pipe(gulp.dest(dest))
})

gulp.task('app.js', () => {
  let conf = buffer
    .stream(new Buffer(JSON.stringify(Config)), 'config.js')
    .pipe(ngConfig('odin.config', { wrap: false }))
  let app = gulp.src(['src/common/lib/*.js', 'src/**/index.js', 'src/**/*.js'])
  return series(conf, app)
    .pipe(concat('app.js'))
    .pipe(gulpIf(prod, annotate()))
    .pipe(gulpIf(prod, uglify()))
    .pipe(gulp.dest(dest))
})

gulp.task('app.tpl', () => {
  return gulp
    .src(['src/**/*.html'])
    .pipe(replace('<!-- #api -->', base))
    .pipe(htmlmin())
    .pipe(templates('app.tpl.js', { module: 'odin.app' }))
    .pipe(gulpIf(prod, uglify()))
    .pipe(gulp.dest(dest))
})

gulp.task('app.html', () => {
  return gulp
    .src('src/app/layout/index.html')
    .pipe(replace('<!-- #ts -->', Date.now()))
    .pipe(replace('<!-- #api -->', base))
    .pipe(gulp.dest(dest))
})

gulp.task('app.assets', () => {
  return gulp.src('assets/**/*').pipe(gulp.dest(dest))
})

gulp.task('vendor.css', () => {
  let css = gulp.src([
    'node_modules/angular-color-picker/angular-color-picker.css',
    'node_modules/font-awesome/css/font-awesome.css',
    'node_modules/animate.css/animate.css'
  ])
  let scss = gulp
    .src(['src/app/layout/app.sass'])
    .pipe(sass({ includePaths: ['node_modules'] }).on('error', sass.logError))

  return series(scss, css)
    .pipe(concat('vendor.css'))
    .pipe(
      gulpIf(
        prod,
        cssnano({
          autoprefixer: { browsers: ['last 2 versions'], add: true },
          safe: true
        })
      )
    )
    .pipe(gulp.dest(dest))
})

gulp.task('vendor.fonts', () => {
  return gulp
    .src(['node_modules/font-awesome/fonts/*'])
    .pipe(gulp.dest(`${dest}/fonts`))
})

gulp.task('vendor.js', () => {
  return gulp
    .src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
      'node_modules/ngUpload/ng-upload.min.js',
      'node_modules/angular-color-picker/angular-color-picker.js',
      'node_modules/angular-jwt/dist/angular-jwt.min.js',
      'node_modules/angular-truncate-2/dist/angular-truncate-2.min.js',
      'node_modules/angularFileInput/dist/angular-file-input.min.js',
      'node_modules/papaparse/papaparse.min.js',
      'node_modules/sugar-date/dist/sugar-date.min.js',
      'node_modules/mustache/mustache.min.js',
      'node_modules/localforage/dist/localforage.min.js',
      'node_modules/clipboard/dist/clipboard.min.js',
      'node_modules/chart.js/dist/Chart.min.js',
      'node_modules/angular-chart.js/dist/angular-chart.min.js',
      'node_modules/angular-cache/dist/angular-cache.min.js',
      'node_modules/lodash/lodash.min.js',
      'node_modules/rrule/lib/rrule.js',
      'node_modules/rrule/lib/nlp.js',
      'node_modules/checklist-model/checklist-model.js',
      'node_modules/angular-papaparse/dist/js/angular-PapaParse.js'
    ])
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest(dest))
})

gulp.task('vendor.debug', () => {
  return gulp
    .src([
      'node_modules/angular/angular.min.js.map',
      'node_modules/angular-animate/angular-animate.min.js.map',
      'node_modules/angular-route/angular-route.min.js.map',
      'node_modules/angular-sanitize/angular-sanitize.min.js.map',
      'node_modules/ngUpload/ng-upload.min.js.map',
      'node_modules/angular-cache/dist/angular-cache.min.map',
      'node_modules/angular-chart.js/dist/angular-chart.min.js.map'
    ])
    .pipe(gulp.dest(dest))
})

gulp.task('clean', () => del(['dist/**/*']))

gulp.task('default', () => {
  sequence('clean', [
    'app.css',
    'app.js',
    'app.tpl',
    'app.html',
    'app.assets',
    'vendor.css',
    'vendor.js',
    'vendor.fonts',
    'vendor.debug'
  ])
})

gulp.task('watch', ['default'], () => {
  gulp.watch(['src/**/*.css'], ['app.css'])
  gulp.watch(['src/**/*.js'], ['app.js'])
  gulp.watch(['src/app/layout/index.html'], ['app.html'])
  gulp.watch(['src/**/*.html', '!src/app/layout/index.html'], ['app.tpl'])
})
