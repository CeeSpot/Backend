'use strict';

module.exports = {
  example_modal_function: function () {
  	console.log("Entering model!");
  	var sql_result;

  	new Promise(function(resolve, reject) {
  	  // body...
  	  con.query("SELECT * FROM users", function (err, result) {
	  	if (err) throw err;
	  	sql_result = JSON.stringify(result);
	  	resolve(sql_result);
      });
  	}).then((data) => {
  		console.log(data);
  	  return data;
  	});	
  },
  bar: function () {
    return "ay";
  }
};