'use strict';

var gulp = require('gulp'),
    del = require('del'),
    merge = require('merge-stream'),
    concat = require('gulp-concat'),

    tsc = require('gulp-typescript'),
    jsMin = require('gulp-uglify'),

    sass = require('gulp-sass'),
    cssPrefix = require('gulp-autoprefixer'),
    cssMin = require('gulp-cssnano'),

    imageMin = require('gulp-imagemin'),

    paths = {
        scss_base: 'node_modules/scss-base/src',
        vendor: [
            'node_modules/phaser-ce/build/custom/pixi.js',
            'node_modules/phaser-ce/build/custom/p2.js',
            'node_modules/phaser-ce/build/custom/phaser-creature.js',
            'node_modules/systemjs/dist/system-polyfills.js',
            'node_modules/systemjs/dist/system.js'
        ],
        ts: 'src/**/*.ts',
        html: 'src/**/*.html',
        images: 'src/assets/images/**/*.*',
        scss: 'src/scss/**/*.scss',
        scssMain: 'src/scss/main.scss'
    };

gulp.task('clean', () => del('dist/'));

gulp.task('html', () => {
    return gulp.src(paths.html)
        .pipe(gulp.dest('dist/'));
});

gulp.task('tsc', () => {
    let tsProject = tsc.createProject('tsconfig.json');
    let tsResult = tsProject.src().pipe(tsProject());

    return tsResult.js.pipe(gulp.dest('dist/game/'));
});

gulp.task('scss', () => {
    return gulp.src(paths.scssMain)
        .pipe(sass({
            precision: 10,
            includePaths: [ paths.scss_base ]
        }))
        .pipe(concat('styles.css'))
        .pipe(cssPrefix())
        .pipe(gulp.dest('dist/css/'));
});

gulp.task('vendor', () => {
    return gulp.src(paths.vendor)
        .pipe(concat('vendor.js'))
        .pipe(gulp.dest('dist/js/'));
});

gulp.task('images', () => {
    return gulp.src(paths.images)
        .pipe(imageMin())
        .pipe(gulp.dest('dist/assets/images/'));
});

gulp.task('minify', () => {
    let js = gulp.src('dist/**/*.js')
        .pipe(jsMin())
        .pipe(gulp.dest('dist/'));
    let css = gulp.src('dist/css/styles.css')
        .pipe(cssMin())
        .pipe(gulp.dest('dist/css/'));

    return merge(js, css);
});

gulp.task('watch', () => {
    let watchScss   = gulp.watch(paths.scss, ['scss']),
        watchHtml   = gulp.watch(paths.html, ['html']),
        watchTs     = gulp.watch(paths.ts, ['tsc']),
        watchImages = gulp.watch(paths.images, ['images']),

        onChanged = (event) => console.log('File ' + event.path + ' was ' +
            event.type + '. Running tasks...');

    watchScss.on('change', onChanged);
    watchHtml.on('change', onChanged);
    watchTs.on('change', onChanged);
    watchImages.on('change', onChanged);
});

gulp.task('default', [ 'html', 'tsc', 'scss', 'vendor', 'images' ]);
