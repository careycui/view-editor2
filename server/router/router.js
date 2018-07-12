const Router = require('koa-router');
const Page = require('./../apis/pageRelated.js');
const Folder = require('./../apis/foldersRelated.js');
const router = new Router();

router.get('/', async (ctx, next) => {
	ctx.redirect(process.env.homePage);
});

router.get('/pro/index', Page.proIndex);

router.get('/pro/indexByFolderId/:folderid', Page.proIndexByFolderId);

router.get('/topic/index', Page.topicIndex);

router.get('/topic/indexByFolderId/:folderid', Page.topicIndexByFolderId);

router.post('/base/save', Page.save);

router.post('/base/update', Page.update);

router.get('/base/copy/:id', Page.copy);

router.get('/base/delete/:id', Page.delete);

router.post('/base/appendto/folder', Page.baseAppendFolder);

router.post('/base/shiftout/folder', Page.baseShiftOutFolder);

router.get('/pro/getPage/:id', Page.getProPage);

router.get('/topic/getPage/:id', Page.getTopicPage);

router.post('/pro/savepage', Page.savePagePro);

router.post('/topic/savepage', Page.savePageTopic);

router.get('/folder/get/:type', Folder.getFolderByType);

router.get('/folder/getById/:id', Folder.getFolderById);

router.post('/folder/create', Folder.createFolder);

router.post('/folder/update', Folder.updateFolder);

router.post('/folder/delete', Folder.updateFolder);

module.exports = router;