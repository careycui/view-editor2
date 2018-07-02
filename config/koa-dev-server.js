require('./../build/check-versions')()
const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./../server/router/router');
const kb = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path');

const Webpack = require('webpack');
const webpackConfig = require('./../build/webpack.dev.conf.js');
const compiler = Webpack(webpackConfig);
const koaWebpack = require('koa-webpack-middleware');
const opn = require('opn');

const config = require('./index.js');

const app = new Koa();

app.use(logger());


app.use(static(path.posix.join(__dirname, config.server.viewPath)));

app.use(cors());

app.use(kb({
	onerror: (err, ctx) => {
		ctx.throw('Error parsing the body information', 422);
	}
}));

app.use(json());

app.use(router.routes());

app.use(router.allowedMethods());

// koaWebpack({ 
// 		compiler
// 	}).then((middleware) => {

// 	app.listen(config.dev.port, () => {
// 		console.log('Server start add '+ config.dev.port +'........');
// 		opn('http://localhost:' + config.dev.port + config.server.homePage);
// 	});

// 	app.on('error', (err, ctx) => {
// 		console.log('server error : ', err);
// 	});
// 	app.use(middleware);

// }).catch((result) => {
// 	// console.log(result);
// });
app.use(koaWebpack.devMiddleware(compiler, {
	noInfo: false,
	publicPath: webpackConfig.output.publicPath
}));
app.use(koaWebpack.hotMiddleware(compiler));

app.listen(config.dev.port, () => {
		console.log('Server start add '+ config.dev.port +'........');
		opn('http://localhost:' + config.dev.port + config.server.homePage);
	});

	app.on('error', (err, ctx) => {
		console.log('server error : ', err);
	});

module.exports = app;