/**
 * app 入口，在不同的模式加载不同服务器配置
 */
if(process.env.NODE_ENV === 'development'){
	require('./config/koa-dev-server');
}else{
	require('./config/koa-prod-server');
}