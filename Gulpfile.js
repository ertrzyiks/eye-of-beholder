const fs = require('fs')
const path = require('path')
const gulp = require('gulp')
const nunjucksRender = require('gulp-nunjucks-render')
const data = require('gulp-data')
const htmlmin = require('gulp-htmlmin')
const inlinesource = require('gulp-inline-source')

const damnFilePath = path.join(__dirname, 'DAMN')
const lastFailureText = fs.readFileSync(damnFilePath, 'utf-8')
const lastFailure = new Date(lastFailureText).getTime()

function getData() {
  return {
    last_failure: lastFailure
  }
}

gulp.task('default', function () {
  return gulp.src('src/views/index.nunjucks')
    .pipe(data(getData))
    .pipe(nunjucksRender({
      path: 'src/views'
    }))
    .pipe(inlinesource())
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('docs'))
})
