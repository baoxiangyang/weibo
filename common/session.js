module.exports = function(req,res,next){
	var sessionid = req.cookies.sessionId;
	if(global.sessionId){
		req.user = global.sessionId[sessionid]
	}else{
		req.user = undefined;
	}
	next()
}