var express = require('express');
var router = express.Router();
var request = require('request');
var models = require('../../models');
var Op = models.Sequelize.Op
var jwt = require('jsonwebtoken'); // 使用jwt签名
require('dotenv').config()


router.post('/login', function (req, res, next) {
    var code = req.body.code
    request.get({
        uri: 'https://api.weixin.qq.com/sns/jscode2session',
        json: true,
        qs: {
            grant_type: 'authorization_code',
            appid: 'wx4a9965771e11b4bd',
            secret: 'e94f1c12cb09e31bff0f12826f945b60',
            js_code: code
        }
    }, async (err, response, data) => {
        if (response.statusCode === 200) {
            if (response.body.errcode) {
                return res.json('你的code已过期')
            }

            let user = await models.User.findOne({
                where: {openid: data.openid}
            })

            if (!user) {
                user = await models.User.create({openid: data.openid, admin: 0})
            }

            var token = jwt.sign({
                user_id: user.id,
                openid: user.openid,
                admin: user.admin
            }, process.env.KEY, {expiresIn: 60 * 60 * 24});
            res.json({success: true, message: '请求成功', token: token})
        } else {
            res.json(err)
        }
    })
})


router.get('/', async function (req, res, next) {
    var result = await models.Like.findAndCountAll({
        where: {
            userId: req.decoded.user_id
        },
    });

    var music_ids = result.rows.map(item => {
        return item.musicId
    })

    var musics = await models.Music.findAll({
        where: {
            id: {
                [Op.in]: music_ids
            }
        }
    });

    res.json({
        musics: musics,
        count: result.count
    })
})


module.exports = router;


