var express = require('express');
var router = express.Router();
var models = require('../../models');

// 所有分类
router.get('/', function (req, res, next) {
    models.Book.findAll({order: [['id', 'DESC']]}).then(books => {
        res.json({books: books});
    })
    // res.json(req.user.id);
});

// 查询单条
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    models.Book.findByPk(id).then(book => {
        res.json({book: book})
    })
});

// 新增分类
router.post('/', function (req, res, next) {
    // res.json(req.body)
    models.Book.create(req.body).then((book) => {
        res.json({book: book})
    });
});


// 编辑分类
router.put('/:id', function (req, res, next) {
    models.Book.findByPk(req.params.id).then(book => {
        book.update(req.body);
        res.json({book: book})
    })
});

// 删除分类
router.delete('/:id', function (req, res, next) {
    models.Book.findByPk(req.params.id).then(book => {
        book.destroy();
        res.json({book: book})
    })
});

// 排序
router.put('/', function (req, res, next) {
    // res.json(req.body)
    models.Book.findByPk(req.body.id).then(book => {
        book.update({
            sort: req.body.sort,
        })
        res.json({book: book})
    });
});

module.exports = router;