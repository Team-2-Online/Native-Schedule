var model = (function(){

var fieldsSchema = [];
var tableName = "example-table";

fieldsSchema.push({
    key:   "id",
    value: "integer"
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

  return {
    fieldsSchema: fieldsSchema,
    tableName: tableName
  };
})();

module.exports = model;
