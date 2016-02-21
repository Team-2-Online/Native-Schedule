"use strict";

var Sqlite = require("nativescript-sqlite");

var sqliteSingleton = (function () {
  var instance;

  function init() {
    return new Sqlite("ApplicationDb", function (err, db) {
      if (err) {
        throw new Error('Failed to open database!', err);
        console.error("Failed to open database", err);
      } else {
        console.log("Debug: DbInstance is set!");
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

  function _createTableFromModel(model){
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
      }else{
        console.log("Debug: Successfully created table!");
      }
    });
  };

  function _insertEntry(tableName, input){
    var valuesString = '';
    var placeHolder = '';
    for(var propertyName in input) {
      valuesString += input[propertyName];
      valuesString += ',';
      placeHolder += '?,';
    }
    valuesString = valuesString.substring(0, valuesString.length - 1);
    placeHolder = placeHolder.substring(0, placeHolder.length - 1);

    _getInstance().execSQL("insert into `"+ tableName +"` ("+ Object.keys(input) +") values ("+ valuesString +")", function(err) {
      if (err) {
        console.log("Error with inserting entity", err);
        return;
      }else {
        console.log("Debug: Successfully added info!");
      }
    });
  };

  function _insertMany(tableName, input){
    for (var i = 0; i < input.length; i++) {
      _insertEntry(tableName, input[i]);
    }
  };

  function _findById(tableName, id){
    var result = undefined;
    _getInstance().get("SELECT * FROM `"+ tableName +"` WHERE `id` == '"+ id +"'", function (err, loadedData) {
      if (err) {
        console.log(err);
      } else {
        result = loadedData;
      }
    });
    return result;
  };

  function _getAllFromTable(tableName) {
    var result = undefined;
    _getInstance().all("SELECT * FROM `"+ tableName +"`", function(err, resultSet) {
      if (err) {
        console.log(err);
      } else {
        result = resultSet;
      }
    });
    return result;
  };

  function _deleteById(tableName, id){
    _getInstance().execSQL("DELETE FROM `"+ tableName +"` WHERE `id` == '"+ id +"'", function(err) {
      if (err) {
        console.log("Error with deleting entity", err);
        return;
      }else {
        console.log("Debug: Successfully deleted info!");
      }
    });
  }

  return {
    getInstance: _getInstance,
    createTable: _createTableFromModel,
    insertRecord: _insertEntry,
    insertMany: _insertMany,
    findById: _findById,
    getAllFromTable: _getAllFromTable,
    deleteById: _deleteById
  };
})();

module.exports = sqliteSingleton;
