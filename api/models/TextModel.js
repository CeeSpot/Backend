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
              data: 'Something went wrong',
              authorised: true
            })
          } else {
            resolve({
              success: true,
              data: res,
              authorised: true
            });
          }
        });
      } else {
        reject({
          success: false,
          authorised: false
        })
      }
    });
  },
  getText: function (req) {
    return new Promise(function (resolve, reject) {
      config.con.query(`SELECT * FROM text`, [req.params.blog_id], function (err, res) {
        if (err) {
          reject({
            success: false,
            data: "Failed to get text"
          })
        } else {
          resolve({
            success: true,
            data: res
          });
        }
      })
    });
  },
  getTextByKey: function (req) {
    return new Promise(function (resolve, reject) {
      config.con.query(`SELECT * FROM text WHERE id = ?`, [req.params.text_id], function (err, res) {
        if (err) {
          reject({
            success: false,
            data: "Failed to get text"
          })
        } else {
          resolve({
            success: true,
            data: res
          });
        }
      })
    });
  }
};