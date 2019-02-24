"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var extractValues = function (input) {
    var output = input.map(function (i) { return loopFields(i); });
    console.log(JSON.stringify(output));
};
exports.extractValues = extractValues;
var loopFields = function (value) {
    var output = {};
    Object.keys(value).forEach(function (k) {
        var valueField = value[k];
        output[k] = valueFromField(valueField);
    });
    return output;
};
var valueFromField = function (valueField) {
    if (isArrayValue(valueField)) {
        return valueField.arrayValue.values.map(function (v) { return valueFromField(v); });
    }
    else if (isMapValue(valueField)) {
        return loopFields(valueField.mapValue.fields);
    }
    else {
        return getRawValue(valueField);
    }
};
var getRawValue = function (object) {
    if (object instanceof Object) {
        var key = Object.keys(object)[0];
        return object[key];
    }
    return object;
};
var isArrayValue = function (object) {
    return object.hasOwnProperty('arrayValue');
};
var isMapValue = function (object) {
    return object.hasOwnProperty('mapValue');
};
