const Router = require('koa-router');
const Page = require('./../apis/pageRelated.js');
const Folder = require('./../apis/foldersRelated.js');
const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.redirect(process.env.homePage);
});

router.get('/pro/index/:type', Page.proIndex);

router.get('/pro/indexByFolderId/:folderid', Page.proIndexByFolderId);

router.get('/topic/index/:type', Page.topicIndex);

router.get('/topic/indexByFolderId/:folderid', Page.topicIndexByFolderId);

router.post('/pro/save', Page.savePro);

router.post('/topic/save', Page.saveTopic);

router.post('/pro/update', Page.updatePro);

router.post('/topic/update', Page.updateTopic);

router.post('/pro/savepage', Page.savePagePro);

router.post('/topic/savepage', Page.savePageTopic);

router.get('/pro/getPage/:id', Page.getProPage);

router.get('/topic/getPage/:id', Page.getTopicPage);

router.get('/pro/copy/:id', Page.copyProPage);

router.get('/topic/copy:id', Page.copyTopicPage);

router.get('/pro/delete/:id', Page.deleteProPage);

router.get('/topic/delete:id', Page.deleteTopicPage);

router.post('/pro/appendto/folder', Page.proAppendFolder);

router.post('/topic/appendto/folder', Page.topicAppendFolder);

router.post('/pro/shiftout/folder', Page.proShiftOutFolder);

router.post('/topic/shiftout/folder', Page.topicShiftOutFolder);

router.get('/folder/get/:type', Folder.getFolderByType);

router.get('/folder/getById/:id', Folder.getFolderById);

router.post('/folder/create', Folder.createFolder);

router.post('/folder/update', Folder.updateFolder);

router.post('/folder/delete', Folder.updateFolder);

module.exports = router;