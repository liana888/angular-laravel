const gulp   = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const babel  = require('gulp-babel');

gulp.task('concat-angular', function() {
    return gulp.src([
        './public/bower_components/angular/angular.min.js',
        './public/bower_components/angular-ui-router/release/angular-ui-router.min.js',
        './public/bower_components/angular-jwt/dist/angular-jwt.min.js',
        './public/bower_components/angular-resource/angular-resource.min.js',
        './public/bower_components/angular-animate/angular-animate.min.js',
        './public/bower_components/angular-toastr/dist/angular-toastr.tpls.min.js',
        './public/bower_components/ng-file-upload/ng-file-upload-all.min.js',
        ])
        .pipe(concat('angular.js'))
        .pipe(gulp.dest('./public/build'));
});

gulp.task('concat', function() {
    return gulp.src([
        './public/app/app.js',
        './public/app/modules/**/*Module.js',
        './public/app/modules/**/*State.js',
        './public/app/services/*Service.js',
    ])
        .pipe(babel({
            presets: ['env']
        }))
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/build'));
});


gulp.task('concat:watch', function () {
    gulp.watch('./public/app/**/*.js', ['concat']);
});