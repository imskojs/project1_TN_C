var gulp = require('gulp');
var gutil = require('gulp-util');
var bower = require('bower');
var concat = require('gulp-concat');
var sass = require('gulp-sass');
var minifyCss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var inlinesource = require('gulp-inline-source');
var ngTemplate = require('gulp-ng-template');
var rename = require('gulp-rename');
var sh = require('shelljs');


var paths = {
    sass: ['./scss/**/*.scss', './www/state/**/*.scss'],
    js: [
        './www/js/app.js',
        './www/js/config/**/*.js',
        './www/js/service/**/*.js',
        './www/js/directive/**/*.js',
        './www/js/filter/**/*.js',
        './www/state/**/*.js'
    ]
};
//------------------------
//  Add library paths here
//------------------------
var libPaths = [
    './www/lib/underscore/underscore.js',
    './www/lib/moment/moment.js',
    './www/lib/ionic/js/ionic.bundle.js',
    './www/lib/angular-resource/angular-resource.js',
    './www/lib/uiBootstrapDatePicker/ui-bootstrap-custom-tpls-0.13.0.js',
    './www/lib/ngCordova/dist/ng-cordova.js'
];

gulp.task('lib', function(done) {
    gulp.src(libPaths)
        .pipe(concat('libs.all.js'))
    // .pipe(uglify({
    //     mangle: true
    // }))
    .pipe(rename({
        extname: '.min.js'
    }))
        .pipe(gulp.dest('./www/lib/'))
        .on('end', done);
});

gulp.task('template', function() {
    return gulp.src('./www/**/*.html')
        .pipe(ngTemplate({
            standalone: true,
            filePath: 'tpl.js'
        }))
        .pipe(gulp.dest('./www/state/'));
});




gulp.task('sass', function(done) {
    gulp.src([
        './scss/ionic.app.scss',
        './scss/common.scss',
        './www/state/**/*.scss'
    ])
        .pipe(concat('ionic.app.all.scss'))
        .pipe(sass({
            errLogToConsole: true
        }))
        .pipe(minifyCss({
            keepSpecialComments: 0
        }))
        .pipe(rename({
            extname: '.min.css'
        }))
        .pipe(gulp.dest('./www/css/'))
        .on('end', done);
});

gulp.task('js', function(done) {
    gulp.src([
        './www/js/app.js',
        './www/js/config/**/*.js',
        './www/js/service/**/*.js',
        './www/js/directive/**/*.js',
        './www/js/filter/**/*.js',
        './www/state/**/*.js'
    ])
        .pipe(concat('app.all.js'))
    // .pipe(uglify({
    //     mangle: true
    // }))
    .pipe(rename({
        extname: '.min.js'
    }))
        .pipe(gulp.dest('./www/js/'))
        .on('end', done);
});



// gulp.task('inlinesource', function() {
//     return gulp.src('./www/index-dev.html')
//         .pipe(inlinesource({
//             compress: false
//         }))
//         .pipe(rename('index.html'))
//         .pipe(gulp.dest('./www/'));
// });

gulp.task('init', ['sass', 'libs', 'js']);
gulp.task('default', ['sass', 'js']);

gulp.task('watch', function() {
    gulp.watch(paths.sass, ['sass']);
    gulp.watch(paths.js, ['js']);
});









//==========================================================================
//              IONIC BUILT
//==========================================================================
gulp.task('install', ['git-check'], function() {
    return bower.commands.install()
        .on('log', function(data) {
            gutil.log('bower', gutil.colors.cyan(data.id), data.message);
        });
});

gulp.task('git-check', function(done) {
    if (!sh.which('git')) {
        console.log(
            '  ' + gutil.colors.red('Git is not installed.'),
            '\n  Git, the version control system, is required to download Ionic.',
            '\n  Download git here:', gutil.colors.cyan('http://git-scm.com/downloads') + '.',
            '\n  Once git is installed, run \'' + gutil.colors.cyan('gulp install') + '\' again.'
        );
        process.exit(1);
    }
    done();
});
