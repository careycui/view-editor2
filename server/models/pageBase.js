const seq = require('./../db/db');
const moment  = require('moment');
const Sequelize = require('sequelize');

const PageBase = seq.define('page_base', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	t_type : Sequelize.STRING,
	page_type: {
		type: Sequelize.ENUM,
		values: [0,1], //0 普通 ; 1 海报
		defaultValue: 0
	},
	pc: Sequelize.STRING,
	mobile: Sequelize.STRING,
	title : Sequelize.STRING,
	desc: Sequelize.STRING,
	img_cover: Sequelize.STRING,
	create_time:{
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		get(){
			const time = this.getDataValue('create_time');
			if(time){
				return time.toLocaleString();
			}else{
				return null;
			}
		}
	},
	update_time: {
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW,
		get(){
			const time = this.getDataValue('update_time');
			if(time){
				return time.toLocaleString();
			}else{
				return null;
			}
		}
	},
	folder_id: Sequelize.STRING,
	trash: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
},{
	freezeTableName: true,
	timestamps: false
});
module.exports = PageBase;