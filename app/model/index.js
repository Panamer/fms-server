const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');
const moment = require('moment');

/**
 * sequelize 选项配置
 */
const options = {
    define: {
        underscoredAll: true,
        // paranoid: true,
        getterMethods: {
            createdAt () {
                const data = this.getDataValue('createdAt');
                if (data) {
                    return moment(data).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            updatedAt () {
                const data = this.getDataValue('updatedAt');
                if (data) {
                    return moment(data).format('YYYY-MM-DD HH:mm:ss');
                }
            },
            deletedAt () {
                const data = this.getDataValue('deletedAt');
                if (data) {
                    return moment(data).format('YYYY-MM-DD HH:mm:ss');
                }
            }
        }
    }
};

/**
 * 创建数据库实例 and 连接数据库
 */
const sequelize = new Sequelize(Object.assign(options, config.mysql));

/**
 * 验证数据库连接
 */
sequelize
    .authenticate()
    .then(() => {
        console.log('Database connection success.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

/**
 * 导入模型model
 */
const db = {};
fs.readdirSync(path.join(__dirname, 'table')).filter(file => {
    return file.endsWith('js') && file !== 'index.js';
}).forEach(file => {
    const model = sequelize.import(path.join(path.join(__dirname, 'table'), file));
    if (model && model.name) {
        const name = model.name.charAt(0).toUpperCase() + model.name.substring(1);
        db[name] = model;
    }
});

/**
 * 模型关联
 */
Object.keys(db).forEach(function (modelName) {
    if ('associate' in db[modelName]) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

/**
 * 同步模型到数据库
 */
sequelize.sync({ force: true }).then(function() {
    console.log('Server successed to start');
}).catch(function(err) {
    console.log('Server failed to start due to error: %s', err);
});

module.exports = db;
