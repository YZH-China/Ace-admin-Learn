var queryMethod = require("./database-mysql.js");

module.exports.Register = function(values, callback){
	var sql = "insert into user set ?, reg_date=current_date()";
	queryMethod.query(sql, values, function(results){
		callback(results);
	})
};

module.exports.usernameRepeatCheck = function(values, callback){
	var sql = "select * from user where ?";
	queryMethod.query(sql, values, function(results){
		callback(results);
	})
};

module.exports.login = function(values, callback){
	var sql = "select * from user where ? and ?";
	var arr_values = objectToArray(values);
	queryMethod.query(sql, arr_values, function(results){
		callback(results);
	})
}

//对象转化成每个键值对为一项的对象数组
function objectToArray(obj){
	var arr = [];
	for(var keys in obj){
		var empty = {};
		empty[keys] = obj[keys];
		arr.push(empty);
	}
	return arr;
}