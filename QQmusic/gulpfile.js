var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var autoprefixer = require('autoprefixer');
var cssnano = require('cssnano');
var connect = require('gulp-connect');


// running path
var devMode = process.env.NODE_ENV === 'development';

// base path
var folder = {
    src : './src/',
    build : './build/'
};

// html
gulp.task('html', function () {
    var html = gulp.src(folder.src + 'html/*')
                .pipe(connect.reload());
    if (!devMode) {
        html.pipe(plugins.htmlclean());
    }
    html.pipe(gulp.dest(folder.build + 'html'));
});

// less
gulp.task('less', function () {
    var dealCss = [autoprefixer()];
    if (!devMode) {
        dealCss.push(cssnano());
    }
    gulp.src(folder.src + 'css/**/*.less')
        .pipe(plugins.plumber())
        .pipe(connect.reload())
        .pipe(plugins.less())
        .pipe(plugins.postcss(dealCss))
        .pipe(gulp.dest(folder.build + 'css'));
});

// js 
gulp.task('js', function () {
    var js = gulp.src(folder.src + 'js/*')
                .pipe(plugins.plumber())
                .pipe(connect.reload());
    if (!devMode) {
        js.pipe(plugins.uglify())
          .pipe(plugins.stripDebug());
    }
    js.pipe(gulp.dest(folder.build + 'js'));
});

// images
gulp.task('images', function () {
    gulp.src(folder.src + 'images/*')
        .pipe(connect.reload())
        .pipe(plugins.newer(folder.build + 'images'))
        .pipe(plugins.imagemin())
        .pipe(gulp.dest(folder.build + 'images'));
});

// watch
gulp.task('watch', function () {
    gulp.watch(folder.src + 'html/*.html', ['html']);
    gulp.watch(folder.src + 'css/*.less', ['less']);
    gulp.watch(folder.src + 'js/*.js', ['js']);
    gulp.watch(folder.src + 'images/*', ['images']);
});

// local server
gulp.task('server', function () {
    connect.server({
        port : 8005,
        livereload : true
    });
});

// run task
gulp.task('default', ['html', 'less', 'js', 'images', 'watch', 'server']);