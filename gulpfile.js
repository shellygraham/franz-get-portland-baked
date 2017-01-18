var gulp = require('gulp'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  htmlreplace = require('gulp-html-replace'),
  autoprefixer = require('gulp-autoprefixer'),
  minifycss = require('gulp-minify-css'),
  rename = require('gulp-rename'),
  sass = require('gulp-sass'),
  sourcemaps = require('gulp-sourcemaps'),
  livereload = require('gulp-livereload'),
  path = {
    HTML: 'index.html',
    JS_DIR: 'assets/js',
    JS_VENDOR_DIR: 'assets/js/vendor',
    ALL_JS: ['assets/js/*.js', 'index.html'],
    JS: ['assets/js/*.js'],
    MINIFIED_OUT: 'app.min.js',
    DEST_SRC: 'assets/js/src',
    DEST_BUILD: 'assets/js/min',
    DEST: 'assets/js'
  };

gulp.task('copy', function(){
  gulp.src(path.HTML)
    .pipe(gulp.dest(path.DEST));
});

gulp.task('watch', function(){
  livereload.listen();
  gulp.watch(path.ALL_JS, ['copy']);
  gulp.watch('./assets/scss/**/*.scss', ['sass']);
});

gulp.task('build', function(){
  gulp.src(path.JS)
    .pipe(concat(path.MINIFIED_OUT))
    .pipe(uglify())
    .pipe(gulp.dest(path.DEST_BUILD));
});

gulp.task('replaceHTML', function(){
  gulp.src(path.HTML)
    .pipe(htmlreplace({
      'js': "assets/js/min/" + path.MINIFIED_OUT
    }))
    .pipe(gulp.dest(path.DEST));
});

gulp.task('sass', function() {
  gulp.src('./assets/scss/**/*.scss')
    .pipe(sass())
    //.pipe(sass({ includePaths: ['./assets/scss/bourbon', './assets/scss/base/extends', './html/assets/scss/vendor']}))
    .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1'))
    .pipe(gulp.dest('./assets/css'))
    .pipe(rename({suffix: '.min'}))
    .pipe(minifycss())
    .pipe(gulp.dest('./assets/css'))
    .pipe(livereload());
});

gulp.task('scripts', function() {
  gulp.src([
      path.JS_VENDOR_DIR + '/jquery.min.js',
      path.JS_VENDOR_DIR + '/**/*.js',
      path.JS_DIR + '/app.js'
  ])
    .pipe(sourcemaps.init())
    .pipe(concat('app.concat.js'))
    .pipe(rename('app.min.js'))
    .pipe(sourcemaps.write('assets/js'))
    .pipe(gulp.dest(path.DEST_BUILD))
    .pipe(livereload());
});

gulp.task('default', ['watch']);

gulp.task('production', ['replaceHTML', 'scripts']);
