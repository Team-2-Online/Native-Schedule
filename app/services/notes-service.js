'use strict';

 var liteDb = require(__base + "common/SQLiteDatabase"); 
 var notesModel = require(__base + "data-models/note");
 var moment = require("moment");
 var _ = require("underscore");
 
 var currentDate = new Date();

function all(page) {
   var result = liteDb.getAllFromTable(notesModel);
   var sorted = _.chain(result)
            .sortBy('id')
            .value()
            .reverse()
            
   return sorted;
}

function save(content, imagePath, type) {

   var record = {
        noteContent: "'" + content + "'",
        noteType: "'" + type + "'",
        noteImagePath: "'" + imagePath + "'"
                };
            
    liteDb.insertRecord(notesModel.tableName, record);            
}

module.exports = {
  all,
  save,
};