const Sequelize = require('sequelize');
const sequelize = new Sequelize('page', 'root', '123456', {
	host: 'localhost',
	dialect: 'mysql',
	timezone: '+08:00'
});
module.exports = sequelize;