var url  =  require('url');
var html = require('../common/newEjs');
var crypto = require('crypto');
var mongo = require('../common/db');
var postData = require('./postData')
function post(req,res,next){
	if(req.method == 'POST'){
		var reqUrl = url.parse(req.url).pathname;
		switch(reqUrl){
			case "/":
				postData(req,res)
				break;
			case "/login":
				login(req,res)
				break;
			case "/reg":
				 reg(req,res)
				break;
			default :
				next();
		}
	}else{
		next()
	}
}
function reg(req,res){
	var data = req.bodys;
	if(data.password === data['password-repeat']){
		var md5 = crypto.createHash('md5');
		var password = md5.update(data.password).digest('hex');
		var obj ={
			'username':data.username,
			'password':password,
			'email':data.email
		}
		mongo.insert('users',obj,function(err){
			if(err){
				if(err.code == '11000'){
					html('reg',{
						"title":'注册',
						'local':"用户已存在，请重新输入用户名"
					},function(html){
						res.writeHead(200,{'Content-Type':'text/html'});
						res.end(html)
					});	
				};
				return;
			};
			res.writeHead(302,{'Location':'/login'});
			res.end();
		})
	}else{
		html('reg',{
			"title":'注册',
			'local':"两次密码不相同,请重新注册"
		},function(html){
			res.writeHead(200,{'Content-Type':'text/html'});
			res.end(html)
		})
	}
}
function login(req,res){
	var data = req.bodys;
	var md5 = crypto.createHash('md5');
	var password = md5.update(data.password).digest('hex');
	var obj = {
		'username':data.username,
		'password':password
	};
	mongo.findOne('users',obj,function(err,doc){
		if(err) throw err;
		if(doc === null){
			html('login',{
				"title":'登陆',
				'local':"用户名或密码不正确"
			},function(html){
				res.writeHead(200,{'Content-Type':'text/html'});
				res.end(html)
			})
		}else{
			success(req,res,doc) //登陆成功时执行
		}
	})
}
module.exports = post;
function success(req,res,doc){
	var session_id = romstr(20);
	var sessionId = {};
	sessionId[session_id]={
		'name':req.bodys.username,
		'email':doc.email
	}
	global.sessionId = sessionId;
	res.writeHead(302,{
		'Set-Cookie':['sessionId='+session_id+';HttpOnly=true'],
		'Location':'/'
	})
	res.end();
};
function romstr(number){
	var len = parseInt(number);
	var str = "1234567890qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM";
	var str2 = '';
	for(var i = 0; i< len ; i++){
		var num=Math.floor(Math.random()*str.length);
		str2 += str.charAt(num)
	}
	if(global.sessionId){
		if(!global.sessionId.str2){
			return str2;
		}else{
			romstr(number);
		};
	}else{
		return str2;
	};
};
