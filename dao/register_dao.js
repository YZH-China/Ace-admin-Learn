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
	var arr_values = queryMethod.objectToArray(values);
	queryMethod.query(sql, arr_values, function(results){
		callback(results);
	})
}