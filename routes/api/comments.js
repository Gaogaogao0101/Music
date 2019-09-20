var express = require('express');
var router = express.Router();
var models = require('../../models');
var Op = models.Sequelize.Op

// 文章列表
router.get('/:book_id', async function (req, res, next) {
    console.log(req)
    var comments = await models.Comment.findAll({
        where: {
            bookId: req.params.book_id
        }
    });

    res.json({
        comments: comments,
    });
});


router.post('/', async function (req, res, next) {
    var comment = await models.Comment.create(req.body)
    res.json({comment: comment});
});


module.exports = router;