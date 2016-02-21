# What is this and how to use it?

With two words - a singleton implementation over SQLite `tns` package with easy interface (I think).


# Usage
1. You need to define a table for where you would store the data
```javascript
var fieldsSchema = [];
var tableName = "example-table";

fieldsSchema.push({
    key:   "id",
    value: "integer PRIMARY KEY"
});
fieldsSchema.push({
    key:   "name",
    value: "text"
});
fieldsSchema.push({
    key:   "year",
    value: "numeric"
});
fieldsSchema.push({
    key:   "successPoints",
    value: "real"
});
```
* in the key field you define the name of column
* in the value field you define restrictions and configurations
* note: if you define `integer PRIMARY KEY` it will become auto_increment

2. Require the SQLiteDatabase.js
```javascript
var liteDb = require(__base + "common/SQLiteDatabase");
```
* you can export the data-model and require it as well

3. API

* getInstance() - will provide singleton instance
* createTable(data_model) - will create table if not exist with assigned data model
* insertRecord(table_name, {}) - will add single record in db. Look at example (for the string value!)

```javascript
  {
    name: "'Some name'",
    year: 2016
  }
```

* insertMany(table_name, [{},{}]) - uses foreach over array with objects described above
* findById(table_name, id) - returns the found record at assigned id. Returns `null` if nothing found
* getAllFromTable(data_model) - returns all records
* deleteById(table_name, id) - deletes the entry at assigned id
* you can use [the official documentation of the tns package](https://github.com/NathanaelA/nativescript-sqlite) for some other actions.

# Example code
```javascript
var liteDb = require("common/SQLiteDatabase"); //use __base + "data-models/example" if you keep this architecture
var exampleModel = require("data-models/example");

var somewhere = function () {
  liteDb.getInstance(); //If you want to use the official documentation api

  liteDb.createTable(exampleModel);

  var record = {
    name: "'Some name'",
    year: 2015
  };
  liteDb.insertRecord(exampleModel.tableName, record);

  var dataToInsert = [
    {
      name: "'Some name'",
      year: 2015
    },
    {
      name: "'Some name2'",
      year: 2015
    },
    {
      name: "'Some name3'",
      year: 2015
    }
  ];
  liteDb.insertMany(exampleModel.tableName, dataToInsert);

  var searched = liteDb.findById(exampleModel.tableName, 5);

  liteDb.deleteById(exampleModel.tableName, 5);

  var aLotOfRecords = liteDb.getAllFromTable(exampleModel); //will return [{},{}] with exampleModel structure
};
```
