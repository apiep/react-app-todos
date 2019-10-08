const gulp = require("gulp")
const rimraf = require("gulp-rimraf")
const exec = require("gulp-exec")
const n_exec = require("child_process").exec

gulp.task("clean", function() {
	return gulp.src("dist/", { read: false }).pipe(rimraf())
})

gulp.task("echo", function() {
	return gulp
		.src(".env", { allowEmpty: true })
		.pipe(exec("auto version"))
		.pipe(exec.reporter({ stdout: true }))
		.pipe(gulp.dest("./dest.txt"))
})

gulp.task("version", function(cb) {
	n_exec("auto version", (error, out, err) => {
		console.log("out:", out)
		console.log("err:", err)
		cb(error)
	})
})
