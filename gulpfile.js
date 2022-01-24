const gulp = require('gulp');
const browserSync = require('browser-sync')
const sass = require('gulp-sass')(require('sass'));
const autoprefixer = require('gulp-autoprefixer');
const rename = require("gulp-rename");
const cleanCSS = require('gulp-clean-css');

gulp.task('server', function () {
   browserSync.init({
      server: {
         baseDir: "src"
      }
   });

});

gulp.task('style', function () {
   return gulp.src('src/sass/**/*.+(sass|scss)')
      .pipe(sass({ outputStyle: 'compressed' }).on('error', sass.logError))
      .pipe(rename({
         prefix: "",
         suffix: ".min",
      }))
      .pipe(autoprefixer())
      .pipe(cleanCSS({ compatibility: 'ie8' }))
      .pipe(gulp.dest('src/css'))
      .pipe(browserSync.stream());
});

gulp.task('watch', function () {
   gulp.watch('src/sass/**/*.+(sass|scss)', gulp.parallel('style'))
   gulp.watch('src/*.html').on("change", browserSync.reload)
})

gulp.task('default', gulp.parallel('watch', 'server', 'style'))
