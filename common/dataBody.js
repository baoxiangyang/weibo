var url = require('url');
var querystring = require('querystring')
module.exports = function(req,res,next){
	var contentType = req.headers['content-type'];
	if(req.method == 'GET'){
		var parse = url.parse(req.url,true).query;
		req['bodys'] = parse;
		next();
	}else if(req.method == 'POST' &&(contentType.toString().indexOf('application/x-www-form-urlencoded') !== -1)){
		var data = "";
		req.on('data',function(chunk){
			data +=chunk;
		})
		req.on('end',function(){
			req['bodys'] = querystring.parse(data);
			next()	
		})
	}else{
		next()
	}
}