const gulp = require('gulp');
const sass = require('gulp-sass');
const del = require('del');
const uglifycss = require('gulp-uglifycss');
const autoprefixer = require('gulp-autoprefixer');

gulp.task('build-sass', () => {
    gulp.src('docs/scss/index.scss')
    .pipe(sass())
    .on('error', (err) => {console.log(err)})
    .pipe(autoprefixer({
        browsers: ['last 2 versions'],
        cascade: false
    }))
    .pipe(uglifycss())
    .pipe(gulp.dest('static/css'))
});

gulp.task('clean', () => {
    return del([
        'static/css/**/*.css',
    ]);
});

gulp.task('watch', ['clean', 'build-sass'], () => {
    gulp.watch('docs/scss/**/*.scss', ['build-sass']);
});

gulp.task('default', ['watch']);