var express = require('express');
var router = express.Router();
var request = require('request');
var models = require('../../models');
var Op = models.Sequelize.Op
var jwt = require('jsonwebtoken'); // 使用jwt签名
require('dotenv').config()
var bcrypt = require('bcryptjs');

//注册
router.post('/register', async function (req, res, next) {
  //定义一个user，user的内容是数据库里面的用户名
  let user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })
//如果等于定义的user，则返回并发送“用户已存在”信息
  if (user) {
    return res.json({
      success: false, message: '用户名已存在'
    })
  }
  //用bcrypt加密用户名。因为不能直接把不加密的密码传到数据库中，不安全。数字8的意思是，转为八位数加密密码。
  var password = bcrypt.hashSync(req.body.password, 8);

  //接上面的判断..如果不等于传入的user的值，则创建一个新的用户名和密码，密码加密，25行代码。
  user = await models.User.create({
    username: req.body.username,
    password: password
  })

  //这一步是获取token。process.env.KEY.这句话的意思就是把加密后的密码在这里用到，固定语法。后面跟着的是失效时间60s，60min，24小时。然后成功拿到token。
  var token = jwt.sign({
    user_id: user.id,
    admin: user.admin
  }, process.env.KEY, {expiresIn: 60 * 60 * 24});
  res.json({success: true, message: '请求成功', token: token})
})

//登录
router.post('/login', async function (req, res, next) {
  //一样的思路，定义一个变量，里面装数据库里面的用户名，然后判断
  let user = await models.User.findOne({
    where: {
      username: req.body.username
    }
  })

  //比对解密后的用户名是否正确。下面的判断是。如果数据库里面没有，或者解密后的密码与数据库里面的密码不一致，前者和后者在对比。则返回false.
  if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
    return res.json({
      success: false, message: '用户名/密码错误'
    })
  }
  if(!user){
    return res.json({
      success:false,message:'没有此账号'
    })
  }
  //如果对比一致，则拿到token，请求成功
  var token = jwt.sign({
    user_id: user.id,
    admin: user.admin
  }, process.env.KEY, {expiresIn: 60 * 60 * 24});
  res.json({success: true, message: '请求成功', token: token})
})




router.get('/', async function (req, res, next) {
  var result = await models.Like.findAndCountAll({
    where: {
      userId: req.decoded.user_id
    },
  });

  //将每一个musicId循环出来，再对应的找他相关的数据组成新的数组，这个的点赞的。
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
