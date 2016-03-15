var url  =  require('url');
var html = require('../common/newEjs');
var path  = require('path');
var mongo = require('../common/db');
function get(req,res,next){
	if(req.method == 'GET'){
		var reqUrl = url.parse(req.url).pathname;
		var Path = path.basename(reqUrl)
		if(Path == ""){
			Path = 'index';
		}
		switch(reqUrl){
			case "/":
				index(req,res,Path)
				break;
			case "/login":
				login(req,res,Path);
				break;
			case "/reg":
				reg(req,res,Path);
				break;
			case "/out":
				out(req,res,Path);
				break;
			default :
				next();
		}
	}else{
		next()
	}
}
function index(req,res,Path){
	mongo.find('postData',{},function(err,docs){
		if(err) throw err;
		html(Path,{'title':'首页','user':req.user,'data':docs},function(html){
			res.writeHead(200,{'Content-Type':'text/html'})
			res.end(html)
		})
	});
	
}
function login(req,res,Path){
	html(Path,{'title':'登陆'},function(html){
		res.writeHead(200,{'Content-Type':'text/html'})
		res.end(html)
	})
}
function  reg(req,res,Path){
	html(Path,{'title':'注册'},function(html){
		res.writeHead(200,{'Content-Type':'text/html'})
		res.end(html)
	})
};
function out(req,res,Path){
	delete global.sessionId[req.cookies.sessionId];
	res.writeHead(302,{'Location':'/'});
	res.end();
	
}
module.exports = get;