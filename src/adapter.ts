import { ValueField, ArrayValue, MapValue } from './models';

/**
 * Converting Firestore doc into values without value types.
 */
const docToData = (input: ValueField[] | ValueField) => {

    /**
     * Check if object is `ArrayValue`, `MapValue`
     */
    const isArrayValue = (object: any): object is ArrayValue => object.hasOwnProperty('arrayValue');
    const isMapValue = (object: any): object is MapValue => object.hasOwnProperty('mapValue');

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
    const extractObject = (value: ValueField) => {
        const output: any = {};
        // Extract value of each field
        Object.keys(value).forEach(k => {
            const valueField = value[k];
            output[k] = extractValueField(valueField);
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
    const extractValueField = (valueField: any): any => {
        /**
         * `ArrayValue` contains array of ValueField i.e. { values: [{stringValue: 'some value'}, ...] }
         * Each item of values should be extracted.
         */
        if (isArrayValue(valueField)) {
            return valueField.arrayValue.values.map(v => extractValueField(v));
        }
        /**
         * `MapValue` is an Object which its "fields" is ValueField object i.e. {fields: {field1: {stringValue: 'some value}, ...}}
         * Each field should be extracted.
         */
        if (isMapValue(valueField)) {
            return extractObject(valueField.mapValue.fields);
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

    return (input instanceof Array) ? input.map(obj => extractObject(obj)) : extractObject(input);
}

const dataToDoc = (input: Object) => {
    const isNull = (value: any) => value === null
    const isBoolean = (value: any) => typeof value === 'boolean'
    const isNumber = (value: any) => typeof value === 'number' && isFinite(value)
    const isDate = (value: any) => value instanceof Date
    const isString = (value: any) => typeof value === 'string' || value instanceof String
    const isArray = (value: any) => value && typeof value === 'object' && value.constructor === Array
    const isObject = (value: any) => value && typeof value === 'object' && value.constructor === Object
    const isReference = (value: string) => /projects\/\w+\/databases\/\w+\/documents\/.+/g.test(value)
    const strIsNumber = (value: string) => /^\d+$/.test(value)

    const checkValueType = (value: any) => {
        if (isNull(value))
            return { nullValue: value }
        else if (isBoolean(value))
            return { booleanValue: value }
        else if (isDate(value))
            return { timestampValue: value }
        else if (isString(value)) {
            if (isReference(value))
                return { referenceValue: value }
            else if ( strIsNumber(value) && Number(value) % 1 === 0)
                return { integerValue: value }
            return { stringValue: value }
        }
        else if (isNumber(value))
            return { doubleValue: value }
        else if (isArray(value)) {
            const temp = {
                arrayValue: {
                    values: value.map((v: any) => {
                        return checkValueType(v)
                    })
                }
            }
            return temp
        }
        else if (isObject(value)) {
            if (value.hasOwnProperty('latitude') && value.hasOwnProperty('longitude'))
                return { geoPointValue: value }
            const temp: any = { mapValue: { fields: {} } }
            Object.keys(value).forEach(key => {
                temp.mapValue.fields[key] = checkValueType(value[key])
            })
            return temp
        }
        return
    }

    return checkValueType(input).mapValue
}

export default { docToData, dataToDoc }
