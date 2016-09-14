var mongo = require('mongodb'),
host = '127.0.0.1',
port = 27017,
Server = new mongo.Server(host,port,{auto_reconnect:true});
var Db = new mongo.Db('weibo',Server,{safe:true})
function insert(str,optins,callback){
	Db.open(function(err,db){
		if(err){
			callback(err);
			db.close();
			return;
		}
		db.collection(str,function(err,collection){
			if(err){
				callback(err);
				db.close();
				return;
			}
			collection.insert(optins,function(err,doc){
				db.close();
				if(err){
					callback(err);
					return;
				}
				callback()
			})
		})
	})
}
function findOne(str,obj,callback){
	Db.open(function(err,db){
		if(err){
			callback(err);
			return;
		}
		db.collection(str,function(err,collection){
			if(err){
				callback(err);
				return;
			}
			collection.findOne(obj, function(err,doc){
				db.close();
				if(err){
					callback(err);
					return;
				}
				callback(null,doc);
			})
		})
	})
}
function find(str,obj,callback){
	Db.open(function(err,db){
		if(err){
			callback(err);
			return;
		}

		db.collection(str,function(err,collection){
			if(err){
				callback(err);
				return;
			}
			collection.find(obj).sort({'Date':-1}).toArray(function(err,docs){
				if(err) throw err;
				callback(null,docs);
				db.close();
			})
		})
	})
}
module.exports.insert = insert;
module.exports.findOne = findOne;
module.exports.find = find;