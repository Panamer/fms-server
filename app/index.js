const Koa2 = require('koa');
const path = require('path');
const koaBody = require('koa-body');
const koaStatic = require('koa-static');
const compose = require('koa-compose');
const router = require('./routers/index.js');
const handlerr = require('./middleware/err.js');

const app = new Koa2();
const staticPath = koaStatic(path.join(__dirname, 'public'));

app.use(
    compose([
        staticPath,
        handlerr,
        koaBody(),
        router.routes(),
        router.allowedMethods()
    ])
);

module.exports = app;
