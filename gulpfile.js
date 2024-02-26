
gulp.task('watch', function() {
	console.log('Command executed successfully compiling SCSS in assets.');
	 return gulp.src('./public/assets/scss/**/*.scss') 
		.pipe(sourcemaps.init())                       
		.pipe(sass())
		.pipe(beautify.css({ indent_size: 4 }))	
		.pipe(sourcemaps.write(''))   
		.pipe(gulp.dest('./public/assets/css'))
		.pipe(browserSync.reload({
		  stream: true
	}));
});


gulp.task('plugins', function(){
	console.log('Command executed successfully compiling SCSS in plugins.');
	return (gulp.src('./public/assets/plugins/**/*.scss'), gulp.src('./public/assets/plugins/**/**/*.scss'))
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(beautify.css({ indent_size: 4 }))	
	.pipe(sourcemaps.write('.'))
	.pipe(gulp.dest('./public/assets/plugins'));
});

gulp.task('default', gulp.series('watch','plugins'));
