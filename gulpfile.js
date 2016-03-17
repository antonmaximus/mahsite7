var gulp = require('gulp');
var autoprefixer = require('gulp-autoprefixer');
var sourcemaps = require('gulp-sourcemaps');
var fileinclude = require('gulp-file-include');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var gulpIf = require('gulp-if');
var cssnano = require('gulp-cssnano');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');

// Basic Gulp task syntax
gulp.task('hello', function() {
  console.log('Hello Zell!');
})

// Development Tasks 
// -----------------

// Start browserSync server
gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: 'app'
    }
  })
})

// Watchers
gulp.task('watch', function() {
  gulp.watch('app/css/**/*', browserSync.reload);
  // gulp.watch('app/*.html', browserSync.reload);
  gulp.watch('app/js/**/*.js', browserSync.reload);
  gulp.watch('app/templates/**/*.html', ['makehtml']);
})

// Concatenate HTML files
gulp.task('makehtml', function() {
  gulp.src(['app/templates/index.html'])
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file',
      context: {
        name: 'example'
      }
    }))
    .pipe(gulp.dest('app'))
    .pipe(browserSync.reload({ // Reloading with Browser Sync
      stream: true
    }));
});



// Optimization Tasks 
// ------------------

// Optimizing CSS and JavaScript 
gulp.task('useref', function() {
  return gulp.src('app/*.html')
    .pipe(useref())
    .pipe(gulpIf('*.js', uglify()))
    .pipe(gulpIf('*.css', cssnano()))
    .pipe(gulp.dest('dist'));
});

gulp.task('minifyhtml', function() {
  return gulp.src('dist/index.html')
    .pipe(htmlmin({collapseWhitespace: true, removeComments: true}))
    .pipe(gulp.dest('dist'))
});

// Copying specific JS files 
gulp.task('copyjs', function() {
  return gulp.src('app/js/**/jquery.js')
    .pipe(gulp.dest('dist/js'))
})


// Optimizing Images 
gulp.task('images', function() {
  return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg|ico)')
    // Caching images that ran through imagemin
    .pipe(cache(imagemin({
      interlaced: true,
    })))
    .pipe(gulp.dest('dist/images'))
});

// Copying fonts 
gulp.task('fonts', function() {
  return gulp.src('app/fonts/**/*')
    .pipe(gulp.dest('dist/fonts'))
})
// Copying font-awesome
gulp.task('fontawesome', function() {
  return gulp.src('app/font-awesome/**/*')
    .pipe(gulp.dest('dist/font-awesome'))
})

// Cleaning 
gulp.task('clean', function() {
  return del.sync('dist').then(function(cb) {
    return cache.clearAll(cb);
  });
})

gulp.task('clean:dist', function() {
  return del.sync(['dist/**/*', '!dist/images', '!dist/images/**/*']);
});

// Build Sequences
// ---------------

gulp.task('default', function(callback) {
  runSequence(['makehtml', 'browserSync', 'watch'],
    callback
  )
})

gulp.task('build', function(callback) {
  runSequence(
    'clean:dist',
    'makehtml', 
    ['images', 'fonts', 'fontawesome', 'copyjs'],
    'useref', 
    'minifyhtml',
    callback
  )
})
