const Koa = require('koa');
const logger = require('koa-logger');
const router = require('./../server/router/router');
const kb = require('koa-bodyparser');
const json = require('koa-json');
const cors = require('koa2-cors');
const static = require('koa-static');
const path = require('path');

const config = require('./server.config');

process.env.homePage = config.homePage || '/';

const app = new Koa();

app.use(logger());


app.use(static(path.posix.join(__dirname, config.viewPath)));

app.use(cors());

app.use(kb({
	onerror: (err, ctx) => {
		ctx.throw('Error parsing the body information', 422);
	}
}));

app.use(json());

app.use(router.routes());

app.use(router.allowedMethods());

app.listen(config.appPort, () => {
		console.log('Server start add '+ config.appPort +'........');
	});

	app.on('error', (err, ctx) => {
		console.log('server error : ', err);
	});

module.exports = app;