const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./server/router/router');
const kb = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path');

const APP = new Koa();

let staticPath = './dist';

if(process.env.NODE_ENV === 'development'){
	console.log(process.env.NODE_ENV);
	const Webpack = require('webpack');
	const webpackConfig = require('./build/webpack.dev.conf.js');
	const compiler = Webpack(webpackConfig);
	const koaWebpack = require('koa-webpack');
	var config = require('./config')

	koaWebpack({ 
		compiler
	 }).then((middleware) => {
	  APP.use(middleware);
	}).catch((result) => {
		console.log(result);
	});

	 // force page reload when html-webpack-plugin template changes
	// compiler.plugin('compilation', function (compilation) {
	//   compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
	//     hotMiddleware.publish({ action: 'reload' })
	//     cb()
	//   })
	// })

	staticPath = path.posix.join(config.dev.assetsPublicPath)
}

APP.use(logger());

APP.use(static(
  path.join( __dirname,  staticPath)
))
APP.use(cors());
APP.use(kb({
	onerror: (err, ctx) => {
		ctx.throw('Error parsing the body information', 422);
	}
}));
APP.use(json());

APP.use(router.routes());
APP.use(router.allowedMethods());

APP.on('error', (err, ctx) => {
	console.log('server error : ', err);
});

APP.listen(3030, () => {
	console.log('Server start add 3030........');
});

module.exports = APP;