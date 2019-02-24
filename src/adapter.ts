import { ValueField, ArrayValue, MapValue } from './models';

/**
 * Adapter is a class to convert Firestore data into values without value types.
 */
export class Adapter {

    constructor(private input: ValueField[]) { }

    public convert() {
        const output = this.input.map(obj => this.extractObject(obj));
        return output;
    }

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
    private extractObject(value: ValueField) {
        const output: any = {};
        // Extract value of each field
        Object.keys(value).forEach(k => {
            const valueField = value[k];
            output[k] = this.extractValueField(valueField);
        });
        return output;
    }

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
    private extractValueField(valueField: any): any {
        /**
         * `ArrayValue` contains array of ValueField i.e. { values: [{stringValue: 'some value'}, ...] }
         * Each item of values should be extracted.
         */
        if (this.isArrayValue(valueField)) {
            return valueField.arrayValue.values.map(v => this.extractValueField(v));
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
        const key = Object.keys(valueField)[0];
        return valueField[key];
    }

    /**
     * Check if object is `ArrayValue`
     */
    private isArrayValue(object: any): object is ArrayValue {
        return object.hasOwnProperty('arrayValue');
    }

    /**
     * Check if object is `MapValue`
     */
    private isMapValue(object: any): object is MapValue {
        return object.hasOwnProperty('mapValue');
    }
}

export default Adapter
