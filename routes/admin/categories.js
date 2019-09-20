var express = require('express');
var router = express.Router();
var models = require('../../models');

// 所有分类
router.get('/', function (req, res, next) {
    models.Category.findAll({order: [['id', 'DESC']]}).then(categories => {
        res.json({categories: categories});
    })
    // res.json(req.user.id);
});

// 查询单条
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    models.Category.findByPk(id).then(category => {
        res.json({category: category})
    })
});

// 新增分类
router.post('/', function (req, res, next) {
    // res.json(req.body)
    models.Category.create(req.body).then((category) => {
        res.json({category: category})
    });
});


// 编辑分类
router.put('/:id', function (req, res, next) {
    models.Category.findByPk(req.params.id).then(category => {
        category.update(req.body);
        res.json({category: category})
    })
});

// 删除分类
router.delete('/:id', function (req, res, next) {
    models.Category.findByPk(req.params.id).then(category => {
        category.destroy();
        res.json({category: category})
    })
});

// 排序
router.put('/', function (req, res, next) {
    // res.json(req.body)
    models.Category.findByPk(req.body.id).then(category => {
        category.update({
            sort: req.body.sort,
        })
        res.json({category: category})
    });
});

module.exports = router;