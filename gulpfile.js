require('dotenv').config()
const gulp = require('gulp')
const babel = require('gulp-babel')
const concat = require('gulp-concat')
const cssnano = require('gulp-cssnano')
const del = require('del')
const gulpIf = require('gulp-if')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const series = require('stream-series')
const replace = require('gulp-replace')
const templates = require('gulp-angular-templatecache')
const buffer = require('buffer-to-vinyl')
const ngConfig = require('gulp-ng-config')

const prod = process.env.NODE_ENV === 'production'
const dest = process.env.APP_DIST || 'dist'
const base = process.env.API_BASE || ''

const Config = {
  APP: {
    apiURL: `${base}/api/v1`,
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
    .pipe(babel())
    .pipe(gulp.dest(dest))
})

gulp.task('app.tpl', () => {
  return gulp
    .src(['src/**/*.html'])
    .pipe(replace('<!-- #api -->', Config.APP.apiURL))
    .pipe(htmlmin())
    .pipe(
      templates('app.tpl.js', {
        module: 'odin.app',
        transformUrl: url => url.replace(/^\//, '')
      })
    )
    .pipe(gulp.dest(dest))
})

gulp.task('app.html', () => {
  return gulp
    .src('src/app/layout/index.html')
    .pipe(replace('<!-- #ts -->', Date.now()))
    .pipe(replace('<!-- #api -->', Config.APP.apiURL))
    .pipe(gulp.dest(dest))
})

gulp.task('app.assets', () => {
  let manifest = gulp
    .src('assets/manifest.json')
    .pipe(replace('<!-- #api -->', Config.APP.apiURL))
  let browserconfig = gulp
    .src('assets/browserconfig.xml')
    .pipe(replace('<!-- #api -->', Config.APP.apiURL))
  let robots = gulp.src('assets/robots.txt')
  return series(manifest, browserconfig, robots).pipe(gulp.dest(dest))
})

gulp.task('vendor.css', () => {
  let css = gulp.src([
    'node_modules/angular-color-picker/angular-color-picker.css',
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

gulp.task('vendor.js', () => {
  return gulp
    .src([
      'node_modules/angular/angular.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/angular-route/angular-route.min.js',
      'node_modules/angular-sanitize/angular-sanitize.min.js',
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
      'node_modules/ng-idle/angular-idle.min.js',
      'node_modules/marked/marked.min.js',
      'node_modules/angular-marked/dist/angular-marked.min.js',
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
      'node_modules/angular-cache/dist/angular-cache.min.map',
      'node_modules/angular-chart.js/dist/angular-chart.min.js.map'
    ])
    .pipe(gulp.dest(dest))
})

gulp.task('clean', () => del(['dist/**/*']))

gulp.task(
  'default',
  gulp.series(
    'clean',
    gulp.parallel(
      'app.css',
      'app.js',
      'app.tpl',
      'app.html',
      'app.assets',
      'vendor.css',
      'vendor.js',
      'vendor.debug'
    )
  )
)

gulp.task(
  'watch',
  gulp.series('default', () => {
    gulp.watch(['src/**/*.css'], gulp.series('app.css'))
    gulp.watch(['src/**/*.js'], gulp.series('app.js'))
    gulp.watch(['src/app/layout/index.html'], gulp.series('app.html'))
    gulp.watch(
      ['src/**/*.html', '!src/app/layout/index.html'],
      gulp.series('app.tpl')
    )
  })
)
