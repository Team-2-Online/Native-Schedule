var model = (function () {

    var fieldsSchema = [];
    var tableName = "notes";

    fieldsSchema.push({
        key: "id",
        value: "integer PRIMARY KEY"
    });
    fieldsSchema.push({
        key: "noteContent",
        value: "text"
    });
    fieldsSchema.push({
        key: "noteType",
        value: "text"
    });
    fieldsSchema.push({
        key: "noteImagePath",
        value: "integer"
    });

    return {
        fieldsSchema: fieldsSchema,
        tableName: tableName
    };
})();

module.exports = model;