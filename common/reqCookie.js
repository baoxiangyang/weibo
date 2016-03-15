var querystring = require('querystring');
module.exports = function(req, res, next){
	var cookie = req.headers.cookie;
	req.cookies = querystring.parse(cookie,"; ","=");
	next()
}