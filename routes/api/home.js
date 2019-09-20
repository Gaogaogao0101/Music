var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op;


router.get('/', async function (req, res, next) {
    var currentPage = parseInt(req.query.currentPage) || 1;
    var pageSize = 1;

    var music = await models.Music.findOne({
        include: [models.Photo],
        offset: (currentPage - 1) * pageSize,
        limit: pageSize
    });
    //用来判断是否是最后一页
    var nextMusic = await models.Music.findOne({
        offset: currentPage * pageSize,
        limit: pageSize
    });
    res.json({
        music: music,
        nextPage: nextMusic ? true : false,
    });
    //后端会返回一个false
});

module.exports = router;
