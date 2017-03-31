gulp        = require('gulp')
coffee      = require('gulp-coffee')
ck          = require('gulp-coffeecup')
concat      = require('gulp-concat')
minifyCSS   = require('gulp-minify-css')
uglify      = require('gulp-uglify')
rename      = require('gulp-rename')
htmlreplace = require('gulp-html-replace')
minifyHTML  = require('gulp-minify-html')
gutil       = require('gulp-util')
yaml        = require('gulp-yaml')
fs          = require('fs')
exec        = require('child_process').exec
webserver   = require('gulp-webserver')

paths = 
  views: './src/app.coffee'
  css: './src/assets/css/**/*.css'
  scripts: './src/**/*.coffeecup'
  yml2json: './src/datasrc/**/*.yml'
  nmodule: './node_modules'


gulp.task 'yml2json', ->
  currforder = fs.readdirSync('src/datasrc', 'utf8')
  i = 0
  while i < currforder.length
    yml = fs.readFileSync('src/datasrc/' + currforder[i], 'utf8')
    gulp.src('src/datasrc/' + currforder[i]).pipe(yaml(space: 2)).pipe gulp.dest('./build/data/')
    i++
  
# coffee
gulp.task 'coffee', ->
  gulp.src('src/app.coffee').pipe(coffee()).pipe gulp.dest('build/')

gulp.task 'ck', ->
  gulp.src('src/**/*.coffeecup').pipe(ck()).pipe gulp.dest('build/')

gulp.task 'plugins', ->
  gulp.src('src/assets/plugins/**/*.js').pipe(uglify()).pipe(rename((path) ->
    if !path.basename.match('min')
      path.basename += '.min'
    path.extname = '.js'
  )).pipe gulp.dest('./build/plugins/')
  
  gulp.src('./src/assets/plugins/**/*.css').pipe(minifyCSS(keepBreaks: true)).pipe(rename((path) ->
    path.basename += '.min'
    path.extname = '.css'
  )).pipe gulp.dest('./build/plugins/')
  
  gulp.src('./src/assets/fonts/**').pipe gulp.dest('./build/fonts/')

  gulp.src('./src/assets/img/*').pipe gulp.dest('./build/img/')
  

gulp.task 'concat', ->
  gulp.src('./src/assets/css/**/*.css').pipe gulp.dest('./build/css/')

gulp.task 'minify-css', [ 'concat' ], ->
  gulp.src('./build/css/all.css').pipe(minifyCSS(keepBreaks: true)).pipe(rename((path) ->
    path.basename += '.min'
    path.extname = '.css'
    
  )).pipe gulp.dest('./build/css/')

gulp.task 'uglify', ->
  gulp.src('./src/assets/js/**/*.js').pipe(uglify()).pipe(rename((path) ->
    if !path.basename.match('min')
      path.basename += '.min'
    path.extname = '.js'
    
  )).pipe gulp.dest('./build/js/')

gulp.task 'html-replace', ->
  opts = 
    comments: false
    spare: false
    quotes: true
  gulp.src('./app/*.html').pipe(htmlreplace(
    'css': 'css/all.min.css'
    'js': 'js/all.min.js')).pipe(minifyHTML(opts)).pipe gulp.dest('./build/')

gulp.task 'watch', [ 'build' ], ->
  gulp.watch([ paths.scripts ], [ 'ck' ]).on 'change', gutil.log
  gulp.watch([ paths.views ], [ 'coffee' ]).on 'change', gutil.log
  gulp.watch([ paths.yml2json ], [ 'yml2json' ]).on 'change', gutil.log
  gulp.watch([ paths.css ], [ 'concat' ]).on 'change', gutil.log
  
gulp.task 'webserver', ->
  gulp.src('./build/').pipe webserver(
    port: 8000
    livereload: true
    directoryListing: false
    open: false
    fallback: 'index.html')
  
gulp.task 'build', [
  'ck'
  'yml2json'
  'plugins'
  'coffee'
  'minify-css'
  'uglify'
  'webserver'
]
gulp.task 'default', [ 'watch' ]
