var model = (function(){

var fieldsSchema = [];
var tableName = "events";

fieldsSchema.push({
    key:   "id",
    value: "integer PRIMARY KEY"
});
fieldsSchema.push({
    key:   "eventTitle",
    value: "text"
});
fieldsSchema.push({
    key:   "eventDescription",
    value: "text"
});
fieldsSchema.push({
    key:   "eventDay",
    value: "integer"
});
fieldsSchema.push({
    key:   "eventMonth",
    value: "integer"
});
fieldsSchema.push({
    key:   "eventYear",
    value: "integer"
});
fieldsSchema.push({
    key:   "eventHour",
    value: "integer"
});
fieldsSchema.push({
    key:   "eventMinutes",
    value: "integer"
});

  return {
    fieldsSchema: fieldsSchema,
    tableName: tableName
  };
})();

module.exports = model;
