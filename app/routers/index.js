const Router = require('koa-router');
const router = new Router();
const projectApi = require('../controller/project');

// 应用列表
router.get('/project', projectApi.list);
router.post('/project', projectApi.add);

module.exports = router;
