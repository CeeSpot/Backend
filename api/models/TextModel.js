'use strict';
var config = require('../config');

module.exports = {
  editText: function(req){
    return new Promise(function (resolve, reject) {
      let key = req.body.text_key;
      let value_nl = req.body.value_nl;
      let value_en = req.body.value_en;

      if (req.user.isAdmin) {
        con.query("UPDATE `text` SET `value_nl` = ?,`value_en` = ? where `key` = ?", [value_nl, value_en, key], function (err, res) {
          if (err) {
            reject({
              success: false,
              data: 'Something went wrong'
            })
          } else {
            resolve({
              success: true,
              data: res
            });
          }
        });
      }
    });
  },
  getText: function(req) {
    return new Promise(function (resolve, reject) {
      con.query("SELECT * FROM `text`", null, function(err, res){
        resolve(res);
      });
    });
  }
};