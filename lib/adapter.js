"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Adapter is a class to convert Firestore data into values without value types.
 */
var Adapter = /** @class */ (function () {
    function Adapter(input) {
        this.input = input;
    }
    Adapter.prototype.convert = function () {
        var _this = this;
        var output = this.input.map(function (obj) { return _this.extractObject(obj); });
        return output;
    };
    /**
     * Extract an `Object`with types and values into pure values
     * Each field of Object has its type and value.
     * We only need the value
     *
     * @example
     *  {
     *      field1: {                               {
     *          stringValue: 'some value'                 field1: 'some value',
     *      },                              =>            field2: true,
     *      field2: {                                     ...
     *          booleanValue: true                  }
     *      },
     *      ...
     *  }
     *
     */
    Adapter.prototype.extractObject = function (value) {
        var _this = this;
        var output = {};
        // Extract value of each field
        Object.keys(value).forEach(function (k) {
            var valueField = value[k];
            output[k] = _this.extractValueField(valueField);
        });
        return output;
    };
    /**
     * Extract value from a `ValueField`
     *
     * @param valueField { NullValue | BooleanValue | IntegerValue | DoubleValue | TimestampValue | StringValue | BytesValue | ReferenceValue | GeoPointValue | ArrayValue | MapValue }
     *
     * @example
     *  { stringValue: 'some value'} => 'some value'
     *  { mapValue: {fields: {field1: {stringValue: 'some value'}, ...}}} => {field1: 'some value', ...}
     *  { arrayValue: {values: [{stringValue: 'some value'}, ...]}} => ['some value']
     */
    Adapter.prototype.extractValueField = function (valueField) {
        var _this = this;
        /**
         * `ArrayValue` contains array of ValueField i.e. { values: [{stringValue: 'some value'}, ...] }
         * Each item of values should be extracted.
         */
        if (this.isArrayValue(valueField)) {
            return valueField.arrayValue.values.map(function (v) { return _this.extractValueField(v); });
        }
        /**
         * `MapValue` is an Object which its "fields" is ValueField object i.e. {fields: {field1: {stringValue: 'some value}, ...}}
         * Each field should be extracted.
         */
        if (this.isMapValue(valueField)) {
            return this.extractObject(valueField.mapValue.fields);
        }
        /**
         * `StringValue`, `NullValue`, ...
         *  valueField can be a string when it's for `id`
         */
        if (!(valueField instanceof Object)) {
            return valueField;
        }
        var key = Object.keys(valueField)[0];
        return valueField[key];
    };
    /**
     * Check if object is `ArrayValue`
     */
    Adapter.prototype.isArrayValue = function (object) {
        return object.hasOwnProperty('arrayValue');
    };
    /**
     * Check if object is `MapValue`
     */
    Adapter.prototype.isMapValue = function (object) {
        return object.hasOwnProperty('mapValue');
    };
    return Adapter;
}());
exports.Adapter = Adapter;
exports.default = Adapter;
