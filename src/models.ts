/**
 * Represent type and value
 * @example
 * 1. { nullValue: null }
 * 2. { booleanValue: false }
 * ...
 */
interface NullValue {
    nullValue: null
}

interface BooleanValue {
    booleanValue: boolean
}

interface IntegerValue {
    integerValue: string
}

interface DoubleValue {
    doubleValue: number
}

interface TimestampValue {
    timestampValue: Date
}

interface StringValue {
    stringValue: string
}

interface BytesValue {
    bytesValue: string
}

interface ReferenceValue {
    referenceValue: string
}

/**
 * Represent GeoPoint type and value
 * @example
 * {
 *      geoPointValue: {
 *          latitude: 123.456
 *          longitude: 456.789
 *      }
 * }
 */
interface GeoPointValue {
    geoPointValue: {
        latitude: number;
        longitude: number
    }
}

/**
 * Represent `Array` and each item's type and value
 * Each item can be a `String`, `Integer`, etc and also an `Array` or `Object`.
 * @example
 * {
 *      arrayValue: {
 *          values: [
 *              { stringValue: 'some value' },
 *              { arrayValue: { ... } },
 *              { mapValue: { ... } },
 *              ...
 *          ]
 *      }
 * }
 */
interface ArrayValue {
    arrayValue: {
        values: ValueItem[]
    }
}

/**
 * Represent `Object` and each property's type and value
 * Each property can be a `String`, `Integer`, etc and also an `Array` or `Object`.
 * @example
 * {
 *      mapValue: {
 *          fields: {
 *              field1: { stringValue: 'some value' },
 *              field2: { arrayValue: { ... } },
 *              field3: { mapValue: { ... } },
 *              ...
 *          }
 *      }
 * }
 */
interface MapValue {
    mapValue: {
        fields: ValueField
    }
}

/**
 * Represent `Object`
 * @example
 * {
 *      field1: { stringValue: 'some value' },
 *      field2: { arrayValue: { ... } },
 *      field3: { mapValue: { ... } },
 *      ...
 * }
 */
interface ValueField {
    [key: string]: NullValue | BooleanValue | IntegerValue | DoubleValue | TimestampValue | StringValue |
    BytesValue | ReferenceValue | GeoPointValue | ArrayValue | MapValue | string
}

/**
 * Represent item of `Array`
 */
interface ValueItem {
    [index: number]: NullValue | BooleanValue | IntegerValue | DoubleValue | TimestampValue | StringValue |
    BytesValue | ReferenceValue | GeoPointValue | ArrayValue | MapValue | string
}

export {
    NullValue,
    ArrayValue,
    BooleanValue,
    IntegerValue,
    DoubleValue,
    TimestampValue,
    StringValue,
    BytesValue,
    ReferenceValue,
    GeoPointValue,
    MapValue,
    ValueField
}