const gulp = require('gulp');
const webserver = require('gulp-webserver');
const watcher = require('gulp-watch');
const debug = require('gulp-debug');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

/**
 *  By default calls the build task.
 *  the Build task starts the app and the server tasks whose dependencies must run first
 *  and then finish
 * 
 * 
 */



//tasks da aplicação

gulp.task('app',['app.html','app.js']); //the app depends on app.html, app.js

gulp.task('app.html',function(){
    gulp.src(['index.html'])
    .pipe(debug())
    .pipe(gulp.dest('public'));
}); 

gulp.task('app.js',function(){
    gulp.src(['index.js'])
    .pipe(debug())
    .pipe(gulp.dest('public'));
})


//task do webserver
gulp.task('server',['watch'],function(){
    gulp.src(['public']).pipe(webserver({
        
        livereload: true,
        port: 4000,
        open: true,
       
    }))
});


gulp.task('watch',function(){
    watcher('index.html',() => gulp.start('app.html'));
    watcher('index.js',() => gulp.start('app.js'))
});






gulp.task('default',['app','server'],function() {
  gulp.src([
    'node_modules/socket.io-client/dist/socket.io.js',
    'node_modules/angular/angular.min.js',   
    'node_modules/angular-socket-io/socket.js',
    
  ])
  .pipe(debug())
  .pipe(uglify())
  .pipe(concat('deps.min.js'))
  .pipe(gulp.dest('public/assets/js'))
});
