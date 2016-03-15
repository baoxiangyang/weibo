var fs = require('fs'),
path = require('path'),
process = require('process');
module.exports = function(req,res,next){
	var paths= decodeURIComponent(req.url);
	if(paths.indexOf('public/') !== -1){
		var reqUrl = process.cwd() +paths;
        var type = path.extname(reqUrl);
        fs.exists(reqUrl,function(exists){
            if(exists){
                fs.readFile(reqUrl,'binary',function(err,data){
                    if(err) next();
                    res.writeHead(200,{"Content-Type":types[type]})
                    res.end(data,'binary')
                })
            }else{
                res.writeHead(404,{"Content-Type":'text/plain'})
                res.end('not found')
            }
        })	
	}else{
		next()
	}
}
types = {
    ".css": "text/css",
    ".gif": "image/gif",
    ".html": "text/html",
    ".ico": "image/x-icon",
    ".jpeg": "image/jpeg",
    ".jpg": "image/jpeg",
    ".js": "text/javascript",
    ".json": "application/json",
    ".pdf": "application/pdf",
    ".png": "image/png",
    ".svg": "image/svg+xml",
    ".swf": "application/x-shockwave-flash",
    ".tiff": "image/tiff",
    ".txt": "text/plain",
    ".wav": "audio/x-wav",
    ".wma": "audio/x-ms-wma",
    ".wmv": "video/x-ms-wmv",
    ".xml": "text/xml"
};