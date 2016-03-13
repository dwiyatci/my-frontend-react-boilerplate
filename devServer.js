/**
 * Created by glenn on 01/03/16.
 */

const path                 = require('path');
const express              = require('express');
const webpack              = require('webpack');
const webpackMiddleware    = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config               = require('./webpack.config.js');

const devModeEnabled = (process.env.NODE_ENV !== 'production');
const port           = devModeEnabled ? 3000 : process.env.PORT;
const app            = express();

if (devModeEnabled) {
  const compiler   = webpack(config);
  const middleware = webpackMiddleware(compiler, {
    publicPath        : config.output.publicPath,
    contentBase       : 'src',
    noInfo            : true,
    historyApiFallback: true,
    //stats           : {
    //  colors      : true,
    //  hash        : false,
    //  timings     : true,
    //  chunks      : false,
    //  chunkModules: false,
    //  modules     : false,
    //},
  });

  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));
  app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'dist/index.html')));
    res.end();
  });
} else {
  app.use(express.static(__dirname + '/dist'));
  app.get('*', function response(req, res) {
    res.sendFile(path.join(__dirname, 'dist/index.html'));
  });
}

app.listen(port, '0.0.0.0', (err) => {

  if (err) {
    console.log(err);
  }

  console.info('==> 🌎 Listening on port %s. Open up http://0.0.0.0:%s/ in your browser.', port, port);
});