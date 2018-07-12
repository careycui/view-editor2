var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  FS_CONFIG: {
    UPLOAD_URL: '"//pbfs.ys7.com/upload.php"',
    FILE_URL: '"//pbmfs.ys7.com/"',
  }
})
