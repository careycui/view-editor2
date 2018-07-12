const timestamp = require('time-stamp');
const Sequelize = require('sequelize');
const PageBase = require('./../models/pageBase');
const ProPage = require('./../models/proPage');
const TopicPage = require('./../models/topicPage');

module.exports.getProPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await ProPage.findById(id);
	const platform_type = page.platform_type;
	let base = {};
	if(platform_type == 0){
		base = await PageBase.findOne({
			where: {
				pc: id
			}
		});
	}else{
		base = await PageBase.findOne({
			where: {
				mobile: id
			}
		});
	}
	ctx.body = JSON.stringify({page,base});
}
module.exports.getTopicPage = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await TopicPage.findById(id);
	const platform_type = page.platform_type;
	let base = {};
	if(platform_type == 0){
		base = await PageBase.findOne({
			where: {
				pc: id
			}
		});
	}else{
		base = await PageBase.findOne({
			where: {
				mobile: id
			}
		});
	}
	ctx.body = JSON.stringify({page, base});
}
module.exports.proIndex = async (ctx, next) => {
	let type = ctx.accepts('json');

	const pages = await PageBase.findAll({
		where: {
			t_type: 'pro',
			trash: {
				$ne: 1
			},
			folder_id: null
		},
		order: [['create_time', 'DESC']]
	});
	ctx.body = JSON.stringify(pages);
}
module.exports.proIndexByFolderId = async (ctx, next) => {
	let type = ctx.accepts('json');
	let folder_id = ctx.params.folderid;

	const pages = await PageBase.findAll({
		where: {
			t_type: 'pro',
			trash: {
				$ne: 1
			},
			folder_id: folder_id
		},
		order: [['create_time', 'DESC']]
	});
	ctx.body = JSON.stringify(pages);
}
module.exports.topicIndex = async (ctx, next) => {
	let type = ctx.accepts('json');

	const pages = await PageBase.findAll({
		where: {
			t_type: 'topic',
			trash: {
				$ne: 1
			},
			folder_id: null
		},
		order: [['create_time', 'DESC']]
	});
	ctx.body = JSON.stringify(pages);
}
module.exports.topicIndexByFolderId = async (ctx, next) => {
	let type = ctx.accepts('json');
	let folder_id = ctx.params.folderid;
	const pages = await PageBase.findAll({
		where: {
			t_type: 'topic',
			trash: {
				$ne: 1
			},
			folder_id: folder_id
		},
		order: [['create_time', 'DESC']]
	});
	ctx.body = JSON.stringify(pages);
}
module.exports.save = async (ctx, next) => {
	let data = ctx.request.body;
	let pcPage;
	let mobilePage;
	if(data.t_type == 'pro'){
		pcPage = await ProPage.create({platform_type: 0});
		mobilePage = await ProPage.create({platform_type: 1});
	}else{
		pcPage = await TopicPage.create({platform_type: 0});
		mobilePage = await TopicPage.create({platform_type: 1});
	}
	data.pc = pcPage.id;
	data.mobile = mobilePage.id;
	let base = await PageBase.create(data);
	ctx.body = JSON.stringify({base, pcPage, mobilePage});
}
module.exports.update = async (ctx, next) => {
	let data = ctx.request.body;
	data.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	let result = await PageBase.update(data,{ where : { id: { $eq : data.base_id } }}, {fields:['title','img_cover','desc','update_time']});
	ctx.body = JSON.stringify(result);
}
const _copyProPage = async (id) => {
	let page = await ProPage.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);
	delete page.id;
	page.title = page.title + '_副本';
	let result = await ProPage.create(page);
	return result;
}
const _copyTopicPage = async (id) => {
	let page = await TopicPage.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);
	delete page.id;
	page.title = page.title + '_副本';
	let result = await TopicPage.create(page);
	return result;
}
module.exports.copy = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await PageBase.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);
	delete page.id;
	delete page.create_time;
	delete page.update_time;
	page.title = page.title + '_副本';

	let result = await PageBase.create(page);
	if(page.pc){
		if(page.t_type === 'pro'){
			await _copyProPage(page.pc);
		}else{
			await _copyTopicPage(page.pc);
		}
	}
	if(page.mobile){
		if(page.t_type === 'pro'){
			await _copyProPage(page.mobile);
		}else{
			await _copyTopicPage(page.mobile);
		}
	}
	ctx.body = JSON.stringify(result);
}
module.exports.delete = async (ctx, next) => {
	let id = ctx.params.id;
	let page = await PageBase.findById(id);
	let tmp = JSON.stringify(page);
	page = JSON.parse(tmp);

	page.update_time = timestamp('YYYY-MM-DD HH:mm:ss');
	page.trash = 1;
	let result = await PageBase.update(page,{ where : { id: { $eq : id } }}, {fields:['update_time', 'trash']});
	ctx.body = JSON.stringify(result);
}
module.exports.baseAppendFolder = async (ctx, next) => {
	let transIds = ctx.request.body;
	let result = await PageBase.update(transIds,{ where : { id: { $eq : transIds.page_id } }}, {fields:['folder_id']});
	ctx.body = JSON.stringify(result);
}
module.exports.baseShiftOutFolder = async (ctx, next) => {
	let page = ctx.request.body;
	let result = await PageBase.update(page,{ where : { id: { $eq : page.id } }}, {fields:['folder_id']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePageTopic = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await TopicPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['html_data','page_data','css']});
	ctx.body = JSON.stringify(result);
}
module.exports.savePagePro = async (ctx, next) => {
	let data = ctx.request.body;
	let result = await ProPage.update(data,{ where : { id: { $eq : data.id } }}, {fields:['html_data','page_data','css']});
	ctx.body = JSON.stringify(result);
}