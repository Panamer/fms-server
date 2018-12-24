const db = require('../model');
// const util = require('../util');
const responseCode = require('../util/response-code');
// const moment = require('moment');

/**
 * 应用列表
 */
exports.list = async (ctx) => {
    await db.Project.findOne({
        where: {
            id: 1
        }
    }).then(result => {
        ctx.body = {
            code: responseCode.SUCCESS,
            data: result
        };
    }).catch(err => {
        ctx.body = {
            code: responseCode.ERROR,
            message: err
        };
    });
};

/**
 * 添加应用
 */
exports.add = async (ctx) => {
    await db.Project.create({ title: 'senior engineer' }).then(res => {
        ctx.body = {
            code: responseCode.SUCCESS
        };
    });
};
