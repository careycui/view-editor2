const seq = require('./../db/db');
const Sequelize = require('sequelize');

const ProPage = seq.define('pro_page', {
	id: {
		type: Sequelize.UUID,
		primaryKey: true,
		defaultValue: Sequelize.UUIDV4
	},
	t_type : Sequelize.STRING,
	title : Sequelize.STRING,
	desc: Sequelize.STRING,
	img_cover: Sequelize.STRING,
	platform_type: {
		type: Sequelize.ENUM,
		values: [0,1], //0 pc ; 1 mobile
		defaultValue: 0
	},
	page_type: {
		type: Sequelize.ENUM,
		values: [0,1], //0 普通 ; 1 海报
		defaultValue: 0
	},
	create_time:{
		type: Sequelize.DATE,
		defaultValue: Sequelize.NOW
	},
	update_time: Sequelize.DATE,
	page_data: Sequelize.TEXT,
	html_data: Sequelize.TEXT,
	css: Sequelize.TEXT,
	concat_id: Sequelize.STRING,
	folder_id: Sequelize.STRING,
	trash: {
		type: Sequelize.INTEGER,
		defaultValue: 0
	}
},{
	freezeTableName: true,
	timestamps: false
});
ProPage.hasOne(ProPage, {foreignKey: 'concat_id', as: 'otherPlatform'});
// ProPage.create({
// 	title: 'Mobile',
// 	desc: 'Mobile',
// 	platform_type: 1,
// 	page_type: 0,
// 	form_data: 'sdfsewrewbfksdjisfduweriowreoo9joi',
// 	page_data: 'weorepwo[cjmvclmclkmvlsmfds',
// 	html_data: 'sfwerowejffiwefowejfoiwejfow'
// });
module.exports = ProPage;