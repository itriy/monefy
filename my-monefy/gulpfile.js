var gulp = require('gulp');
var csv2json = require('gulp-csv2json');
var rename = require('gulp-rename');

gulp.task('to-json', function () {

var csvParseOptions = {}; //based on options specified here : http://csv.adaltas.com/parse/

    gulp.src('./Monefy.Data.24.01.18.csv')
        .pipe(csv2json(csvParseOptions))
        .pipe(rename('db.json'))
        .pipe(gulp.dest('src'));
});