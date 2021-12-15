const { series, parallel, watch } = require('gulp')
const { runServer, reloadServer } = require('./server')
const { cleanDistFolder } = require('./clean')
const { buildMarkup } = require('./markup')
const { optimizeImages } = require('./images')

// watchers
function runWatchers (cb) {
  // pug
  watch([
    'src/pages/**/*.pug',
    'src/layout/**/*.pug',
    'src/blocks/**/*.pug'
  ], series(buildMarkup, reloadServer))

  // images
  watch([
    'images/**/*.+(jpg|png|gif|svg)',
    'src/pages/**/*.+(jpg|png|gif|svg)'
  ], series(optimizeImages, reloadServer))
  cb()
}

// development task
exports.default = series(
  cleanDistFolder,
  parallel(buildMarkup, runServer, optimizeImages),
  runWatchers
)

// build task
exports.build = series(
  cleanDistFolder,
  parallel(buildMarkup, optimizeImages)
)

// clean task
exports.clean = cleanDistFolder
