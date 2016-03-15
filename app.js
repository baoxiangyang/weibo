var app = require("connect")();
var html = require('./common/newEjs');
var publics = require("./common/public");
var get = require('./router/get');
var post = require('./router/post');
var dataBody = require('./common/dataBody');
var reqCookie = require('./common/reqCookie')
var session = require('./common/session')
app.listen(3000); //监听3000端口
app.use(publics); //请求静态支援
app.use(reqCookie); //解析cookie
app.use(session);
app.use(dataBody);//解析上传数据
app.use(get); //处理get请求
app.use(post);//处理post请求