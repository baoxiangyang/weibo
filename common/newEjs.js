var ejs = require('ejs');
fs = require('fs'),
process = require('process');
function html(str, obj ,callback){
	var path = process.cwd()+"/views/"+str+".html";
	console.log(path)
	if(obj['local'] === undefined){
		obj['local'] = "";
	}
	if(obj['user'] === undefined){
		obj['user'] = "";
	}
	obj['posts'] = '';
	obj['filename'] = path;
	fs.readFile(path,'utf8',function(err, data){
		if(err) throw err;
		var html = ejs.render(data,obj)
		callback(html)
	});
}
module.exports = html;