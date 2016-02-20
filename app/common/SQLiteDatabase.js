"use strict";

var Sqlite = require("nativescript-sqlite");

var sqliteSingleton = (function () {
  var instance;

  function init() {
    console.log("Debug: DbInstance is set!");
    return new Sqlite("ApplicationDb", function (err, db) {
      if (err) {
        throw new Error('Failed to open database!', err);
        console.error("Failed to open database", err);
      } else {
        instance = db;
      }
    });
  };

  function _getInstance(){
    if (!instance) {
      init();
    }
    return instance;
  };

  return {
    getInstance: _getInstance,
    createTable: function(model){
      var parametersWithKeys = "";

      var fields = model.fieldsSchema;
      for (var i = 0; i < fields.length; i++) {
        var currentRow = " `"+ fields[i]["key"] +"` "+ fields[i]["value"] +",";
        parametersWithKeys += currentRow;
      }
      parametersWithKeys = parametersWithKeys.substring(0, parametersWithKeys.length - 1);
      _getInstance().execSQL("create table if not exists `" + model.tableName +"` ("+parametersWithKeys+")", function(err) {
        if (err) {
          console.log("Error with creating table", err);
          return;
        }
      });
      console.log("Debug: Successfully created table!");
    },
    initiateDb: function(){
      _getInstance().execSQL("create table if not exists test (`text` text)", function(err) {
        if (err) {
          console.log("Error with creating table", err);
          return;
        }
      });
      console.log("Debug: Successfully created table!");
    },
    insertRecord: function(input){
      _getInstance().execSQL("insert into test (text) values (?)", input, function(err) {
        if (err) {
          console.log("Error with inserting entity" + input, err);
          return;
        }
      });
      console.log("Debug: Successfully iserted entiy " + input + " !");
    }
  };
})();

module.exports = sqliteSingleton;
