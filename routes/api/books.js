var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op

router.get('/', async function (req, res, next) {
    var currentPage = parseInt(req.query.currentPage) || 1;
    var pageSize = parseInt(req.query.pageSize) || 4;
    //pageSize 当前显示页数。
    var where = {};

    // 模糊查询标题
    var title = req.query.title;

    if (title) {
        where.title = {
            [Op.like]: '%' + title + '%'
        }
    }

    var result = await models.Book.findAndCountAll({
        order: [['id', 'DESC']],
        attributes: ['id', 'author', 'title', 'fav_nums'],
        offset: (currentPage - 1) * pageSize,
        include: [models.Photo],
        limit: pageSize,
        where:where
    });

    res.json({
        books: result.rows,
        pagination: {
            currentPage: currentPage,
            pageSize: pageSize,
            // 一共有多少条记录
            total: result.count
        }
    });
});

// 查询单条
router.get('/:id', async function (req, res, next) {
    var book = await models.Book.findOne({
        where: {id: req.params.id},
        include: [models.Photo],
    });
    res.json({book: book});
});



module.exports = router;
