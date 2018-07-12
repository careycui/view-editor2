const seq = require('./../db/db');
const Sequelize = require('sequelize');

const ProPage = seq.define('pro_page', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	platform_type: {
		type: Sequelize.ENUM,
		values: [0,1], //0 pc ; 1 mobile
		defaultValue: 0
	},
	page_data: Sequelize.TEXT,
	html_data: Sequelize.TEXT,
	css: Sequelize.TEXT,
},{
	freezeTableName: true,
	timestamps: false
});
module.exports = ProPage;