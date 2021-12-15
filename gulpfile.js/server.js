const browserSync = require('browser-sync')

function runServer (cb) {
  browserSync.init({
    server: { baseDir: 'dist' },
    open: false,
    logFileChanges: false,
    notify: false,
    online: true,
    files: [
      'dist/*.html'
    ]
  })
  cb()
}

// reload server
function reloadServer (cb) {
  browserSync.reload()
  cb()
}

module.exports = {
  runServer,
  reloadServer
}
