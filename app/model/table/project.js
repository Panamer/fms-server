module.exports = (sequelize, DataTypes) => {
    const Project = sequelize.define('project', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            comment: '自增ID'
        },
        title: {
            type: DataTypes.STRING(50),
            allowNull: false,
            defaultValue: '',
            comment: '活动标题',
            validate: {
                notEmpty: {
                    msg: '活动标题不能为空'
                }
            }
        }
    });

    /**
* 模型关联
* @param models
*/
    // Project.associate = function (models) {
    //     Project.belongsTo(models.User);
    //     Project.hasMany(models.Data);
    // };

    return Project;
};
