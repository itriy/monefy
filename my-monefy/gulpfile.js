var gulp = require('gulp');
var csv2json = require('gulp-csv2json');
var rename = require('gulp-rename');

gulp.task('to-json', function () {

var csvParseOptions = {}; //based on options specified here : http://csv.adaltas.com/parse/

    gulp.src('./db.csv')
        .pipe(csv2json(csvParseOptions))
        .pipe(rename('db.json'))
        .pipe(gulp.dest('/static/'));
});