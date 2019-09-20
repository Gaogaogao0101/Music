var express = require('express');
var router = express.Router();
var models = require('../../models');

// 点赞
router.post('/', async function (req, res, next) {
    console.log(req)
    //先找这个点赞是否已经存在
    var liked = await models.Like.findOne({
        where: {
            musicId: req.body.music_id,
            userId: req.decoded.user_id
        }
    });

    var music = await models.Music.findByPk(req.body.music_id)

    //如果已经存在，则删除这一条点赞，并且对应的点赞数量自减
    if (liked) {
        music.decrement('fav_nums')
        liked.destroy();
        return res.json({msg: '取消成功'});
    }

    //如果不存在，则新增这个点赞，且对应音乐的点赞数量自增
    var like = await models.Like.create({
        musicId: req.body.music_id,
        userId: req.decoded.user_id
    })
    music.increment('fav_nums')

    res.json({msg: '点赞成功'});
});


module.exports = router;
