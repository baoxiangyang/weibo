var mongo = require('../common/db');
var process = require('process');
var fs = require('fs');
var formidable = require('formidable');
module.exports = function(req,res){
	if(!req.user){
		res.writeHead(302,{'Location':'/login'})
		res.end();
		return;
	}
	var form = new formidable.IncomingForm();
	var path = process.cwd()+'/public/images/'+req.user.name;
	var exists = fs.existsSync(path);
	if(!exists){
		fs.mkdirSync(path)
	};
	form.uploadDir = path; //指定文件路径
	form.parse(req, function(error, fields, files){
		form.keepExtensions = true;  //保留文件后缀
		if(files.img.name){
			var Path  =  form.uploadDir+"/"+files.img.name;
			fs.renameSync(files.img.path, Path);	
		};
		var obj = {
			"name":req.user.name,
			'post':fields.post,
			'Date': new Date()
		}
		if(files.img.name){
			obj.img = '/public/images/'+req.user.name+"/"+files.img.name;
		}
		console.log(obj);
		mongo.insert('postData',obj,function(err){
			if(err){
				throw err;
			}
			console.log('数据保存成功');
			res.writeHead(302,{'Location':'/'})
			res.end();
		})
	})
	
}