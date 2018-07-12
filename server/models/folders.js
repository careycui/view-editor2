const seq = require('./../db/db');
const Sequelize = require('sequelize');
const PageBase = require('./pageBase');

const Folders = seq.define('folders', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	name : Sequelize.STRING,
	type: {
		type: Sequelize.ENUM,
		values: ['pro','topic'], 
		defaultValue: 'pro'
	},
	trash: {
		type: Sequelize.INTEGER,
		defaultValue: 1
	}
},{
	freezeTableName: true,
	timestamps: false
});
Folders.hasMany(PageBase, { foreignKey: 'folder_id', as: 'PageBase'});
module.exports = Folders;