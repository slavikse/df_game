import gulp from 'gulp'

export default (name, files) => {
  gulp.task(`${name}_watch`, () => {
    gulp.watch(files,
      gulp.series(name)
    )
  })
}
