var mysql = require("mysql");
var pool = mysql.createPool({
	host:"localhost",
	user:"root",
	password:"kkyuan234",
	database:"aceadminlearn",
	port:3306
});

var QueryMethod = {
	//普通查询
	query:function(sql, callback){
		pool.getConnection(function(err, connection){
			if(err){
				callback(err, null, null);
			} else {
				connection.query(sql, function(qerr, values, fields){
					//释放连接
					connection.release();
					//事件驱动回调
					callback(qerr, values, fields);
				})
			}
		})
	}
};

module.exports = QueryMethod;