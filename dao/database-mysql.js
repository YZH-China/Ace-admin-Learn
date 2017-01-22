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
	query:function(sql, values, callback){
		pool.getConnection(function(err, connection){
			if(err){
				console.error(err);
				return;
			} else {
				connection.query(sql, values, function(qerr, results){
					//释放连接
					connection.release();
					if(qerr){
						console.error(qerr);
						return;
					} else {
						callback(results);
					}
					
				})
			}
		})
	}

};

module.exports = QueryMethod;