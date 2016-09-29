const gulp = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render')
const data = require('gulp-data')
const htmlmin = require('gulp-htmlmin')
const inlineCss = require('gulp-inline-css')

function getDataForFile(file) {
  return {
    example: 'data loaded for ' + file.relative
  }
}

gulp.task('default', function () {
  return gulp.src('src/views/index.nunjucks')
    .pipe(data(getDataForFile))
    .pipe(nunjucksRender({
      path: 'src/views'
    }))
    .pipe(inlineCss())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'))
})
