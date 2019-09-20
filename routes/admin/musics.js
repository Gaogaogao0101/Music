var express = require('express');
var router = express.Router();
var models = require('../../models');

// 所有分类
router.get('/', function (req, res, next) {
    models.Music.findAll({order: [['id', 'DESC']]}).then(musics => {
        res.json({musics: musics});
    })
    // res.json(req.user.id);
});

// 查询单条
router.get('/:id', function (req, res, next) {
    let id = req.params.id;
    models.Music.findByPk(id).then(music => {
        res.json({music: music})
    })
});

// 新增分类
router.post('/', function (req, res, next) {
    // res.json(req.body)
    models.Music.create(req.body).then((music) => {
        res.json({music: music})
    });
});


// 编辑分类
router.put('/:id', function (req, res, next) {
    models.Music.findByPk(req.params.id).then(music => {
        music.update(req.body);
        res.json({music: music})
    })
});

// 删除分类
router.delete('/:id', function (req, res, next) {
    models.Music.findByPk(req.params.id).then(music => {
        music.destroy();
        res.json({music: music})
    })
});

// 排序
router.put('/', function (req, res, next) {
    // res.json(req.body)
    models.Music.findByPk(req.body.id).then(music => {
        music.update({
            sort: req.body.sort,
        })
        res.json({music: music})
    });
});

module.exports = router;