var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var jwt = require('jsonwebtoken');
require('dotenv').config()
// var cors = require('cors')


// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
var homeRouter = require('./routes/api/home');
var booksRouter = require('./routes/api/books');
var commentsRouter = require('./routes/api/comments');
var usersRouter = require('./routes/api/users');
var likesRouter = require('./routes/api/likes');


var adminMusicsRouter = require('./routes/admin/musics');
var adminBooksRouter = require('./routes/admin/books');
var adminCategoriesRouter = require('./routes/admin/categories');
var adminUsersRouter = require('./routes/admin/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 登录验证中间件
app.use(function (req, res, next) {
    if (req.url != '/users/login' && req.url != '/admin/users/login' && req.url != '/admin/users/register') {
        //token可能存在post请求和get请求
        let token = req.body.token || req.query.token || req.headers.token;
        if (!token) {
            return res.status(401).send({
                success: false,
                   message: '当前接口需要认证才能访问.'
            });
        }
        //验证token是否过期
        jwt.verify(token, process.env.KEY, function (err, decoded) {
            if (err) {
                return res.status(401).send({
                    success: false,
                    message: 'token过期，请重新登录'
                });
            }

            if (/^\/admin/.test(req.url) && decoded.admin == 0) {
                return res.status(401).send({
                    success: false,
                    message: '此接口只有管理员能访问'
                });
            }

            req.decoded = decoded;
            next();

        })
    } else {
        next();
    }
})
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
app.use('/', homeRouter);
app.use('/books', booksRouter);
app.use('/comments', commentsRouter);
app.use('/users', usersRouter);
app.use('/likes', likesRouter);


app.use('/admin/musics', adminMusicsRouter);
app.use('/admin/books', adminBooksRouter);
app.use('/admin/categories', adminCategoriesRouter);
app.use('/admin/users', adminUsersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;